import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookBill } from './bookbill.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ICreateBookBill, IBookDTO } from './bookbill.type';
import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class BookbillService {
    constructor(
        @InjectRepository(BookBill) private readonly bookBillRepo: Repository<BookBill>,
        @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ){}
    
    async delete(id: number): Promise<DeleteResult>{
        const bookBill = await this.bookBillRepo.findOne({
            where: {
                id: id,
            },
            relations: [
                'user', 'book'
            ]
        });
        const updateSold = await this.bookRepo.update(bookBill.book.id, {sold: bookBill.book.sold - bookBill.amount})
        return await this.bookBillRepo.delete(id);
    }

    async findById(id: number): Promise<BookBill> {
        return await this.bookBillRepo.findOne({
            where: {
                id: id,
            },
            relations: [
                'user', 'book'
            ]
        });
    }

    async findByUserBook(userId: number, bookId: number): Promise<BookBill> {
        return await this.bookBillRepo.findOne({
            where: {
                user: {id: userId},
                book: {id: bookId}
            },
            relations: [ 'user', 'book' ]
        })
    }

    async create(input: ICreateBookBill): Promise<any>{
        const book = await this.bookRepo.findOne({where: {id: input.bookId}});
        const user = await this.userRepo.findOne({where: {id: input.userId}});
        const bookBill: IBookDTO = {
            amount: input.amount,
            book: book,
            user: user
        }
        const updateSold = await this.bookRepo.update(book.id, {sold: book.sold + input.amount})
        return await this.bookBillRepo.save(bookBill);
    }


    async findByUser(userId: number): Promise<BookBill[]> {
        return this.bookBillRepo.find({
            where: {
                user: {id: userId}
            },
            relations: [
                'user', 'book'
            ]
        })
    }

    async updateAmount(id: number, input: ICreateBookBill): Promise<any> {
        const bookBill = await this.bookBillRepo.findOne({where: { user: {id: input.userId}, book: {id: input.bookId} }});
        return this.bookBillRepo.update(id, {amount: bookBill.amount + input.amount})
    }

}
