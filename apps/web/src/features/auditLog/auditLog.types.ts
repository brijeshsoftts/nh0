export type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type AuditLog = {
  id: string;
  userId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  oldValues: JsonValue;
  newValues: JsonValue;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  } | null;
};

export type AuditLogsQuery = {
  search?: string;
  entityType?: string;
  page: number;
  limit: number;
};
