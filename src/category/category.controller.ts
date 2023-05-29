import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { failResponse, successResponse } from 'src/utils/http';
import { ICreateCategory } from './category.type';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ){}

    @Get('/getAll')
    async getAllUser(): Promise<any> {
        try{
            const listCategory = await this.categoryService.findAll();
            if ( listCategory==null )
                return failResponse('Category not found', 'CategoryNotFound');
            return successResponse(listCategory);
        } catch(error) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Post('/create')
    async createUser(@Body() input: ICreateCategory): Promise<any> {
        try {
            const res = await this.categoryService.create(input)
            return successResponse(res);
        }catch(error) {
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }
}
