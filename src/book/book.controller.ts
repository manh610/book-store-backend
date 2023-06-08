import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { ICreateBook, IUpdateBook, BookID } from './book.type';
import { failResponse, successResponse } from 'src/utils/http';

@Controller('book')
@ApiTags('Books')
export class BookController {
    constructor(
        private readonly bookService: BookService
    ){}

    @Post('/create')
    async createbook(@Body() input: ICreateBook): Promise<any> {
        try{
            if (!input.title || !input.author || !input.date )
                return failResponse('Cần điền đầy đủ thông tin', 'FieldIsRequired');
            const checkExist = await this.bookService.findByTitleAndAuthor(input.title, input.author);
            if ( checkExist!=null )
                return failResponse('Sách đã tồn tại (cùng tiêu đề, cùng tác giả)','BookExist');
            const book = await this.bookService.create(input);
            return successResponse(book);
        } catch(error) {
            return failResponse('Execute service went wrong', 'ServiceException')
        }
    }

    @Get('/getAll')
    async getAllBook(): Promise<any>{
        try{
            const listBook = await this.bookService.findAll();
            if (listBook==null)
                return failResponse('Book is not found', 'BookNotFound');
            return successResponse(listBook);
        } catch(error){
            return failResponse('Execute service went wrong', 'ServiceException')
        }
    }

    @Post('/getInfo')
    async getById(@Body() input: BookID): Promise<any>{
        try{
            const book = await this.bookService.findById(input.id);
            console.log(book)
            if (book==null)
                return failResponse('Book is not found', 'BookNotFound');
            return successResponse(book);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException')
        }
    }

    @Get('/getAllWithBookBill')
    async getAllWithBookbill(): Promise<any>{
        try{
            const listBook = await this.bookService.findAllWithBookBill();
            if (listBook==null)
                return failResponse('Book is not found', 'BookNotFound');
            return successResponse(listBook);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException')
        }
    }

    @Post('/update')
    async updateBook(@Body() input: IUpdateBook): Promise<any>{
        try{
            const book = await this.bookService.findById(input.id);
            if (book==null)
                return failResponse('Book is not found', 'BookNotFound');
            const bookUpdate = await this.bookService.update(input.id, input);
            if (bookUpdate==null)
                return failResponse('Execute service went wrong', 'UpdateFail');
            return successResponse(bookUpdate);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException')
        }
    }

    @Post('/delete')
    async deleteBook(@Body() input: BookID): Promise<any>{
        try{
            const book = await this.bookService.findById(input.id);
            if (book==null)
                return failResponse('Book is not found', 'BookNotFound')
            const bookDelete = await this.bookService.delete(input.id);
            if (bookDelete==null)
                return failResponse('Excute service went wrong', 'DeleteFail');
            return successResponse(bookDelete);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException')
        }
    }

}
