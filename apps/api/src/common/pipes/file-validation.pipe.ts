import { BadRequestException } from '@nestjs/common';

import { ALLOWED_MIME_TYPES } from '../constants';

export const fileValidationPipe = (Size: number, Count: number) => ({
  limits: {
    fileSize: Size,
    files: Count,
  },

  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return callback(
        new BadRequestException(
          'Only JPG, JPEG, PNG, and WebP images are allowed',
        ),
        false,
      );
    }

    callback(null, true);
  },
});
