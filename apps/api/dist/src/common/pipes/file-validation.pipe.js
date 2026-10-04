"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const fileValidationPipe = (Size, Count) => ({
    limits: {
        fileSize: Size,
        files: Count,
    },
    fileFilter: (_req, file, callback) => {
        if (!constants_1.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            return callback(new common_1.BadRequestException('Only JPG, JPEG, and PNG images are allowed'), false);
        }
        callback(null, true);
    },
});
exports.fileValidationPipe = fileValidationPipe;
//# sourceMappingURL=file-validation.pipe.js.map