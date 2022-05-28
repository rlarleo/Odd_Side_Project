import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileRepository } from './uploadFile.repository';
import { UploadFileService } from './uploadfile.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileRepository])],
  exports: [TypeOrmModule],
  controllers: [FileController],
  providers: [FileService, UploadFileService]
})
export class FileModule {}
