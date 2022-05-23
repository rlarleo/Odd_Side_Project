import { Injectable } from '@nestjs/common';
import { createImageURL } from './multer.options';

@Injectable()
export class FilesService {
    public uploadFiles(files: File[]): string[] {
        const generatedFiles: string[] = [];
    
        for (const file of files) {
          generatedFiles.push(createImageURL(file));
          // http://localhost:3001/images/파일이름 형식으로 저장이 됩니다.
        }
    
        return generatedFiles;
    }

    async test(): Promise<any> {
      const list = ['1.jpg','2.jpg','3.jpg','4.jpg','1.jpg',];
      return list;
  }
}
