import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer.config';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload-images')
  @UseInterceptors(FilesInterceptor('file'))
  async uploadFiles(@UploadedFile() file: any) {
    console.log(file);
    return 'Tệp tin đã được tải lên thành công';
  }
}
