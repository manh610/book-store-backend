import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './bill.entity';
import { Repository } from 'typeorm';
import { ICreateBill } from './bill.type';
import { User } from 'src/user/user.entity';
import { Book } from 'src/book/book.entity';
import { BookBill } from 'src/bookbill/bookbill.entity';

@Injectable()
export class BillService {
    constructor(
        @InjectRepository(Bill) private readonly billRepo: Repository<Bill>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
        @InjectRepository(BookBill) private readonly bookBillRepo: Repository<BookBill>,
    ){}

    async findAll(): Promise<Bill[]> {
        return await this.billRepo.find({
            relations: ['user', 'bookbills', 'bookbills.book']
        });
    }

    async findById(id: number): Promise<Bill>{
        return await this.billRepo.findOne({where: {id: id}})
    }

    async findByUser(userId: number): Promise<Bill[]>{
        return this.billRepo.find({
            where: {
                user: {id: userId}
            },
            relations: ['user', 'bookbills', 'bookbills.book']
        })
    }

    async createBill(input: ICreateBill): Promise<any>{
        let user = await this.userRepo.findOne({where: {id: input.userId}})
        const bill = this.billRepo.create({
            user
        });
        const billAns = await this.billRepo.save(bill);

        for ( const bookbillReq of input.bookBills ) {
            const bookbill = await this.bookBillRepo.findOne({where: {id: bookbillReq}});
            await this.bookBillRepo.update(bookbill.id, {bill: billAns})
        }
        return billAns;
    }

    async addBooktoBill(userId: number, bookId: number): Promise<any>{

    }
}
