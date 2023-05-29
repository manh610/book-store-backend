import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookbillService } from './bookbill.service';
import { ICreateBookBill } from './bookbill.type';
import { successResponse, failResponse } from 'src/utils/http';
import { IDInteface } from 'src/utils/type';

@Controller('bookbill')
@ApiTags('BookBills')
export class BookbillController {
    constructor(
        private readonly bookBillService: BookbillService
    ){}


    @Post('/create')
    async create(@Body() input: ICreateBookBill): Promise<any> {
        try{    
            const checkExist = await this.bookBillService.findByUserBook(input.userId, input.bookId);
            if ( checkExist!=null ) {
                const res = await this.bookBillService.updateAmount(checkExist.id, input);
                return successResponse(res);
            }
            const bookbill = await this.bookBillService.create(input);
            return successResponse(bookbill);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Post('/user')
    async findByUser(@Body() input: IDInteface): Promise<any> {
        try{    
            const bookbills = await this.bookBillService.findByUser(input.id);
            if (bookbills==null)
                return failResponse('Bookbill not found by user', 'NotFoundByUser');
            return successResponse(bookbills);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Post('/user/cart')
    async findByUserinCart(@Body() input: IDInteface): Promise<any> {
        try{    
            const bookbills = await this.bookBillService.findByUserinCart(input.id);
            if (bookbills==null)
                return failResponse('Bookbill not found by user', 'NotFoundByUser');
            return successResponse(bookbills);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Post('/delete')
    async delete(@Body() input: IDInteface): Promise<any>{
        try{    
            const bookbill = await this.bookBillService.findById(input.id);
            if (bookbill==null)
                return failResponse('Bookbill not found', 'NotFound');
            const res = await this.bookBillService.delete(input.id);
            return successResponse(res);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }
}
