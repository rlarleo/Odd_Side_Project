import { Injectable } from '@nestjs/common';
import { createImageURL } from './multer.options';
import { UploadFileDTO } from "./dto/uploadFile.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FileRepository } from "./uploadFile.repository";
import { UploadFileService } from "./uploadfile.service";

@Injectable()
export class FileService {
    constructor(
        private uploadFileService: UploadFileService
    ){}
    
    public uploadFiles(files: File[]): string[] {
        const generatedFiles: string[] = [];
    
        for (const file of files) {
          generatedFiles.push(createImageURL(file));
          // http://localhost:3001/images/파일이름 형식으로 저장이 됩니다.
        }
    
        return generatedFiles;
    }

    async save(fileDTO: UploadFileDTO): Promise<UploadFileDTO | undefined> {
        return await this.uploadFileService.save(fileDTO);
    }

    async getFiles(): Promise<any> {
      const list = ['1.jpg','2.jpg','3.jpg','4.jpg','1.jpg',];
      const result = this.uploadFileService.getFields();
      return result;
  }
}
