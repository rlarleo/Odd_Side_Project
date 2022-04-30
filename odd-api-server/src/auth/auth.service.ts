import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

    async registerNewUser(newUser: UserDTO): Promise<UserDTO> {
        let userFind: UserDTO = await this.userService.findByFields({ where: { username: newUser.username } });
        if(userFind){
            throw new HttpException('Username already used!', HttpStatus.BAD_REQUEST);
        }
        return this.userService.save(newUser);
    }

    async validateUserTest(): Promise<any> {
        let userFind = 'kkd';
        return userFind;
    }
    
    async validateUser(user: UserDTO): Promise<UserDTO | undefined> {
        let userFind: UserDTO = await this.userService.findByFields({ 
            where: { email: user.email }
        });
        if(!userFind || user.password !== userFind.password) {
            return undefined;
        }
        return userFind;
    }
}