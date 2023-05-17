import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookbillService } from './bookbill.service';
import { ICreateBookBill } from './bookbill.type';
import { successResponse, failResponse } from 'src/utils/http';

@Controller('bookbill')
@ApiTags('BookBills')
export class BookbillController {
    constructor(
        private readonly bookBillService: BookbillService
    ){}


    @Post('/create')
    async create(@Body() input: ICreateBookBill): Promise<any> {
        try{    
            const bookbill = await this.bookBillService.create(input);
            return successResponse(bookbill);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Get('/user/{userId}')
    async findByUser(@Param('userId') userId: number): Promise<any> {
        try{    
            const bookbills = await this.bookBillService.findByUser(userId);
            if (bookbills==null)
                return failResponse('Bookbill not found by user', 'NotFoundByUser');
            return successResponse(bookbills);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Delete('/delete/{id}')
    async delete(@Param('id') id: number): Promise<any>{
        try{    
            const bookbill = await this.bookBillService.findById(id);
            if (bookbill==null)
                return failResponse('Bookbill not found', 'NotFound');
            const res = await this.bookBillService.delete(id);
            return successResponse(res);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }
}
