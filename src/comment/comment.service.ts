import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';
import { ICommentDTOCreate, ICreateComment } from './comment.type';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
        @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ){}
    
    async create(input: ICreateComment): Promise<any>{
        const book = await this.bookRepo.findOne({where: {id: input.bookId}});
        const user = await this.userRepo.findOne({where: {id: input.userId}});
        const bookBill: ICommentDTOCreate = {
            rate: input.rate,
            content: input.content,
            book: book,
            user: user
        }
        return await this.commentRepo.save(bookBill);
    }


    async findByUser(userId: number): Promise<Comment[]> {
        return this.commentRepo.find({
            where: {
                user: {id: userId}
            },
            relations: [
                'user', 'book'
            ]
        })
    }

    async findByBook(bookId: number): Promise<Comment[]> {
        return this.commentRepo.find({
            where: {
                book: {id: bookId}
            },
            relations: [
                'user', 'book'
            ]
        })
    }
}
