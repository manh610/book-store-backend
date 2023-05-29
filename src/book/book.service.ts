import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ICreateBook, IUpdateBook, BookDTO, BookDTOCreate } from './book.type';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book) private readonly BookRepo: Repository<Book>,
        @InjectRepository(User) private readonly UserRepo: Repository<User>,
        @InjectRepository(Category) private readonly categoryRepo: Repository<Category>
    ) {}

    async findAll(): Promise<Book[]> {
        return await this.BookRepo.find({
            relations: ['user', 'category']
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
            },
            relations: ['category']
        });
    }

    async findByTitleAndAuthor(title: string, author: string): Promise<Book> {
        return await this.BookRepo.findOne({
            where: {
                title: title,
                author: author
            }
        })
    }

    async create(book: ICreateBook): Promise<Book> {
        const user = await this.UserRepo.findOne({where: {id: book.userId}});
        const category = await this.categoryRepo.findOne({where: {id: book.categoryId}})
        const bookDTO: BookDTOCreate = {
            title: book.title,
            author: book.author,
            page: book.page,
            category: category,
            sold: book.sold,
            date: book.date,
            imageUrl: book.imageUrl,
            description: book.description,
            price: book.price,
            user: user
        }
        return await this.BookRepo.save(bookDTO);
    }

    async update(id: number, book: IUpdateBook): Promise<UpdateResult> {
        try {
            const category = await this.categoryRepo.findOne({where: {id: book.categoryId}})
            const infoUpdate = {
                title: book.title,
                author: book.author,
                category: category,
                page: book.page,
                sold: book.sold,
                date: book.date,
                imageUrl: book.imageUrl,
                description: book.description,
                price: book.price
            }
            return await this.BookRepo.update(id, infoUpdate);
        } catch(err) {
            console.log(err)
        }
    }

    async delete(id: number): Promise<DeleteResult>{
        return await this.BookRepo.delete(id);
    }

}
