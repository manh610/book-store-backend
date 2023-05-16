import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookBill } from './bookbill.entity';
import { Repository } from 'typeorm';
import { ICreateBookBill, IBookDTO } from './bookbill.type';
import { Book } from 'src/book/book.entity';

@Injectable()
export class BookbillService {
    constructor(
        @InjectRepository(BookBill) private readonly bookBillRepo: Repository<BookBill>,
        @InjectRepository(Book) private readonly bookRepo: Repository<Book>
    ){}
    
    async create(input: ICreateBookBill): Promise<any>{
        const book = await this.bookRepo.findOne({where: {id: input.bookId}});
        const bookBill: IBookDTO = {
            amount: input.amount,
            book: book
        }
        return await this.bookBillRepo.save(bookBill);
    }

}
