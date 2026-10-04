import { CurrentUser as CUser } from '../../types/shared.types';
export declare const CurrentUser: (...dataOrPipes: (keyof CUser | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
