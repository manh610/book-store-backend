import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from './rate.entity';
import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';
import { IRateDTOCreate, ICreateRate } from './rate.type';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class RateService {
    constructor(
        @InjectRepository(Rate) private readonly rateRepo: Repository<Rate>,
        @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ){}
    
    async checkExist(bookId: number, userId: number): Promise<any>{
        return await this.rateRepo.find({
            where: {
                user: {id: userId},
                book: {id: bookId}
            }
        })
    }

    async  updateRate(id: number, rate: number): Promise<any> {
        return await this.rateRepo.update(id, {rate: rate});
    }

    async create(input: ICreateRate): Promise<any>{
        const book = await this.bookRepo.findOne({where: {id: input.bookId}});
        const user = await this.userRepo.findOne({where: {id: input.userId}});
        const bookBill: IRateDTOCreate = {
            rate: input.rate,
            book: book,
            user: user
        }
        return await this.rateRepo.save(bookBill);
    }


    async findByUser(userId: number): Promise<Rate[]> {
        return this.rateRepo.find({
            where: {
                user: {id: userId}
            },
            relations: [
                'user', 'book'
            ]
        })
    }

    async findByBook(bookId: number): Promise<Rate[]> {
        return this.rateRepo.find({
            where: {
                book: {id: bookId}
            },
            relations: [
                'user', 'book'
            ]
        })
    }
}
