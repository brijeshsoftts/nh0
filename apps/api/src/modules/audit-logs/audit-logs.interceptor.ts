import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Request } from 'express';
import { mergeMap, Observable } from 'rxjs';

import type { CurrentUser } from '../../types/shared.types';

import { AuditLogsService } from './audit-logs.service';

type AuditableRequest = Request & { user?: CurrentUser };

const MUTATION_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
const IGNORED_CONTROLLERS = new Set([
  'AuditLogsController',
  'NotificationsController',
]);
const AUDITED_FIELDS = new Set([
  'action',
  'amount',
  'assignedTo',
  'assignedToId',
  'bookingReference',
  'category',
  'checkInDate',
  'checkOutDate',
  'discountAmount',
  'entityId',
  'id',
  'isActive',
  'name',
  'paymentMethod',
  'paymentReference',
  'priority',
  'role',
  'roomId',
  'roomTypeId',
  'scheduledDate',
  'status',
  'taskType',
  'title',
  'totalAmount',
  'transactionId',
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function safeValues(value: unknown): Record<string, string | number | boolean> {
  if (!isRecord(value)) return {};

  const result: Record<string, string | number | boolean> = {};
  for (const [key, fieldValue] of Object.entries(value)) {
    if (!AUDITED_FIELDS.has(key)) continue;

    if (fieldValue instanceof Date) {
      result[key] = fieldValue.toISOString();
    } else if (
      typeof fieldValue === 'string' ||
      typeof fieldValue === 'number' ||
      typeof fieldValue === 'boolean'
    ) {
      result[key] =
        typeof fieldValue === 'string' ? fieldValue.slice(0, 200) : fieldValue;
    }
  }
  return result;
}

function responseData(response: unknown): unknown {
  return isRecord(response) && 'data' in response ? response.data : response;
}

function responseEntityId(response: unknown): string | null {
  const data = responseData(response);
  if (!isRecord(data)) return null;

  for (const key of [
    'id',
    'bookingId',
    'paymentId',
    'invoiceId',
    'taskId',
    'issueId',
    'roomTypeId',
    'amenityId',
    'customerId',
    'staffId',
    'userId',
  ]) {
    if (typeof data[key] === 'string') return data[key];
  }

  return null;
}

function entityType(controllerName: string, routePath: string): string {
  if (controllerName === 'PublicController') return 'INQUIRY';

  const matches: Record<string, string> = {
    AmenitiesController: 'AMENITY',
    AuthController: 'USER',
    BookingsController: 'BOOKING',
    CustomersController: 'CUSTOMER',
    InvoicesController: 'INVOICE',
    IssuesController: 'ISSUE',
    PaymentsController: 'PAYMENT',
    PaymentsPublicController: 'PAYMENT',
    PaymentsWebhookController: 'PAYMENT',
    ProfileController: 'USER',
    RoomTypesController: 'ROOM_TYPE',
    RoomsController: 'ROOM',
    StaffController: 'STAFF',
    TasksController: 'HOUSEKEEPING_TASK',
    UsersController: 'USER',
  };

  if (matches[controllerName]) return matches[controllerName];
  if (routePath.includes('inquir')) return 'INQUIRY';
  return controllerName
    .replace(/Controller$/, '')
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toUpperCase();
}

function actionName(handlerName: string): string {
  return handlerName.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();
}

@Injectable()
export class AuditLogsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditLogsInterceptor.name);

  constructor(private readonly auditLogsService: AuditLogsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<AuditableRequest>();
    const controllerName = context.getClass().name;
    const handlerName = context.getHandler().name;

    if (
      !MUTATION_METHODS.has(request.method) ||
      IGNORED_CONTROLLERS.has(controllerName) ||
      (controllerName === 'AuthController' && handlerName !== 'register') ||
      (controllerName === 'ProfileController' &&
        handlerName === 'changePassword')
    ) {
      return next.handle();
    }

    const routePath = String(request.route?.path ?? request.path ?? '');
    const type = entityType(controllerName, routePath);
    const action = actionName(handlerName);

    return next.handle().pipe(
      mergeMap(async (response: unknown) => {
        const newValues = {
          ...safeValues(request.body),
          ...safeValues(responseData(response)),
          actorRole: request.user?.role ?? 'SYSTEM',
        };
        const entityId =
          responseEntityId(response) ??
          (typeof request.params?.id === 'string' ? request.params.id : null);

        try {
          await this.auditLogsService.recordMutation({
            userId: request.user?.id ?? null,
            action,
            entityType: type,
            entityId,
            newValues,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : String(error);
          this.logger.error(
            `Failed to persist ${action} audit log for ${type}:${entityId ?? 'unknown'}: ${message}`,
          );
        }

        return response;
      }),
    );
  }
}
