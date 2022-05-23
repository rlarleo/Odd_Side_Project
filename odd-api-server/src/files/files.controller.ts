import {
    Controller,
    Post,
    Get,
    UseInterceptors,
    UploadedFiles,
} from '@nestjs/common';
import { FilesService } from "./files.service";
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer.options';
import { FileDTO } from './dto/file.dto';

@Controller('files')
export class FilesController {
    constructor(private fileService: FilesService){}

    @UseInterceptors(FilesInterceptor('images', null, multerOptions))
    // FilesInterceptor 첫번째 매개변수: formData의 key값,
    // 두번째 매개변수: 파일 최대 갯수
    // 세번째 매개변수: 파일 설정 (위에서 작성했던 multer 옵션들)
    @Post('/disk_upload')
    public uploadFiles(
        @UploadedFiles() files: FileDTO,
    ) {
        const uploadedFiles: string[] = this.fileService.uploadFiles(files.files);
        console.log(uploadedFiles);
        return {
        status: 200,
        message: '파일 업로드를 성공하였습니다.',
        data: {
            files: uploadedFiles,
        },
        };
    }

    @Get('/news-file')
    async isLogin(): Promise<any> {
        return await this.fileService.test();
    }
}
