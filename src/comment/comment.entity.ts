import {  User } from "src/user/user.entity";
import { BookBill } from "src/bookbill/bookbill.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "src/book/book.entity";

@Entity({name: "comments"})
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    rate: number

    @ManyToOne(() => Book, book => book.comments)
    @JoinColumn({ name: 'book_id'})
    book: Book

    @ManyToOne(() => User, user => user.books)
    @JoinColumn({ name: 'user_id'})
    user: User
}
