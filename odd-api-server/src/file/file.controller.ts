import {
    Controller,
    Post,
    Get,
    UseInterceptors,
    UploadedFiles,
    Body,
} from '@nestjs/common';
import { FileService } from "./file.service";
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer.options';
import { UploadFileDTO } from './dto/uploadFile.dto';

@Controller('files')
export class FileController {
    constructor(private fileService: FileService){}

    @UseInterceptors(FilesInterceptor('images', null, multerOptions))
    // FilesInterceptor 첫번째 매개변수: formData의 key값,
    // 두번째 매개변수: 파일 최대 갯수
    // 세번째 매개변수: 파일 설정 (위에서 작성했던 multer 옵션들)
    @Post('/disk_upload')
    public uploadFiles(
        @Body() fileDto: UploadFileDTO,
        @UploadedFiles() files: File[],
        ) {
            console.log(fileDto.fileName);
            const uploadedFiles: string[] = this.fileService.uploadFiles(files);
            console.log(uploadedFiles);
            fileDto.fileName = uploadedFiles[0].split('/news/')[1];
            this.fileService.save(fileDto);
            return {
            status: 200,
            message: '파일 업로드를 성공하였습니다.',
            data: {
                files: uploadedFiles,
            },
        };
    }

    @Get('/news-file')
    async newsFiles(): Promise<any> {
        return await this.fileService.getFiles();
    }
}
