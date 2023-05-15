import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ICreateBook, IUpdateBook, BookDTO, BookDTOCreate } from './book.type';
import { User } from 'src/user/user.entity';

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book) private readonly BookRepo: Repository<Book>,
        @InjectRepository(User) private readonly UserRepo: Repository<User>
    ) {}

    async findAll(): Promise<Book[]> {
        return await this.BookRepo.find({
            relations: ['user']
        });
    }

    async findAllWithBookBill(): Promise<Book[]>{
        return await this.BookRepo.find({
            relations: ['bookbills']
        })
    }
    
    async findById(id: number): Promise<any> {
        return await this.BookRepo.findOne({
            // select: {
            //     id: true,
            //     name: true
            // },
            where: {
                id: id,
            }
        });
    }

    async create(book: ICreateBook): Promise<Book> {
        const user = await this.UserRepo.findOne({where: {id: book.userId}});
        const bookDTO: BookDTOCreate = {
            name: book.name,
            description: book.description,
            price: book.price,
            quantity: book.quantity,
            imageUrl: book.imageUrl,
            user: user
        }
        return await this.BookRepo.save(bookDTO);
    }

    async update(id: number, book: IUpdateBook): Promise<UpdateResult> {
        return await this.BookRepo.update(id, book);
    }

    async delete(id: number): Promise<DeleteResult>{
        return await this.BookRepo.delete(id);
    }

}
