"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
class ValidationPipe {
    schema;
    constructor(schema) {
        this.schema = schema;
    }
    async transform(value) {
        const parsedValue = await this.schema.safeParseAsync(value);
        if (parsedValue.error) {
            const errors = parsedValue.error.issues.map((i) => ({
                field: i.path[0],
                message: i.message,
                code: i.code,
            }));
            const format = {};
            errors.forEach((e) => {
                format[e.field] = {
                    message: e.message,
                    code: e.code,
                };
            });
            throw new common_1.BadRequestException({
                statusCode: 400,
                message: 'Validation failed',
                errors: format,
            });
        }
        return parsedValue.data;
    }
}
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=validation.pipe.js.map