import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { failResponse, successResponse } from 'src/utils/http';
import { ICreateUser } from './user.type';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}


    @Post('/register')
    async createUser(@Body() input: ICreateUser): Promise<any> {
        try {
            const user = await this.userService.create(input);
            return successResponse(user);
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
