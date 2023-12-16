// multer.config.ts

import { MulterModuleOptions } from '@nestjs/platform-express/multer';

export const multerConfig: MulterModuleOptions = {
  dest: './uploads', // Thư mục lưu trữ tệp tin
};
