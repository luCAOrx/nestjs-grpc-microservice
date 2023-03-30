import { FileFilterCallback, diskStorage } from 'multer';
import { resolve } from 'node:path';
import { randomBytes } from 'node:crypto';

export class MulterConfig {
  static getConfig() {
    const twoMB = 2 * 1024 * 1024;
    const storageType = {
      local: diskStorage({
        destination: resolve(__dirname, '..', 'uploads'),
        filename(request, file: Express.Multer.File, callback) {
          const hash = randomBytes(6).toString('hex');

          file.filename = `${hash}-${file.originalname}`;

          callback(null, file.filename);
        },
      }),
    };

    return {
      destination: resolve(__dirname, '..', 'uploads'),
      storage: storageType.local,
      limits: {
        fileSize: twoMB,
      },

      fileFilter(
        request: Request,
        file: Express.Multer.File,
        callback: FileFilterCallback,
      ) {
        const allowedMimes = [
          'image/jpeg',
          'image/pjpeg',
          'image/png',
          'image/jpg',
        ];

        if (allowedMimes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(null, false);
          callback(new Error('Tipo de arquivo inválido.'));
        }
      },
    };
  }
}
