import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions } from "typeorm";
import { UploadFileDTO } from "./dto/uploadFile.dto";
import { FileRepository } from "./uploadFile.repository";

@Injectable()
export class UploadFileService{
    constructor(@InjectRepository(FileRepository) private fileRepository: FileRepository){}

    async getFields(): Promise<UploadFileDTO[] | undefined> {
        return await this.fileRepository.find( {order: {
            id: "DESC"
        }});
    }

    async save(userDTO: UploadFileDTO): Promise<UploadFileDTO | undefined> {
        return await this.fileRepository.save(userDTO);
    }
}