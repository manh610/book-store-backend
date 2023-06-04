import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { failResponse, successResponse } from 'src/utils/http';
import { ILogin, IRegisterUser, IUserCreate, IUserDTO } from './user.type';
import { IDInteface } from 'src/utils/type';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    
    @Post('/login')
    async login(@Body() input: ILogin): Promise<any> {
        try {
            if ( !input.username || !input.password ) 
                return failResponse('Cần điền đầy đủ thông tin', 'FieldIsRequired');
            const user: IUserDTO = await this.userService.checkLogin(input.username, input.password);
            
            if (user==null)
                return failResponse('Username hoặc password không đúng', 'WrongCredentials');
            return successResponse(user);
        } catch(error) {    
            console.log(error)
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Post('/register')
    async createUser(@Body() input: IRegisterUser): Promise<any> {
        try {
            if ( !input.username || !input.password || !input.confirmPassword ) 
                return failResponse('Cần điền đầy đủ thông tin', 'FieldIsRequired');
            if ( input.password != input.confirmPassword)
                return failResponse('Confirm password not equal', 'ConfirmNotEqual');
            if ( input.password.length < 8 ) 
                return failResponse('Password must be longer 8 character','PasswordLengthShort');
            const user: IUserDTO = await this.userService.findByUsername(input.username);
            if (user!=null)
                return failResponse('Username đã tồn tại', 'WrongCredentials');
            const data: IUserCreate = {
                email: input.email,
                username: input.username,
                password: input.password,
                role: 'USER'
            }
            const res = await this.userService.create(data)
            return successResponse(res);
        }catch(error) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Post('/changeToAdmin')
    async changeToAdmin(@Body() input: IDInteface): Promise<any> {
        try {
            const user = await this.userService.findById(input.id);
            if ( user==null )
                return failResponse('User Not Found', 'UserNotFound');
            const res = await this.userService.changeToAdmin(input.id);
            return successResponse(res);
        }catch(error) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Get('/getAll')
    async getAllUser(): Promise<any> {
        try{
            const listUser = await this.userService.findAll();
            if ( listUser==null )
                return failResponse('User not found', 'UserNotFound');
            return successResponse(listUser);
        } catch(error) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Get('/{id}')
    async getById(@Param('id') userId: number): Promise<any>{
        try{
            const user = await this.userService.findById(userId);
            if ( user==null )
                return failResponse('User not found', 'UserNotFound');
            return successResponse(user);
        } catch(error) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }
}
