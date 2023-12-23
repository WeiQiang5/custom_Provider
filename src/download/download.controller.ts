import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { DownloadService } from './download.service';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from './storage';
import { multerOption } from './multer';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Post('aaa')
  @UseInterceptors(FileInterceptor('aaa', multerOption))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log('body', body);
    console.log('file', file);
  }

  @Post('bbb')
  @UseInterceptors(AnyFilesInterceptor(multerOption))
  uploadFiles(@UploadedFiles() file: Array<Express.Multer.File>, @Body() body) {
    console.log('body', body);
    console.log('file', file);
  }
}
