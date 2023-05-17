import {  User } from "src/user/user.entity";
import { BookBill } from "src/bookbill/bookbill.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "src/book/book.entity";

@Entity({name: "rates"})
export class Rate {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    rate: number

    @ManyToOne(() => Book, book => book.rates)
    @JoinColumn({ name: 'book_id'})
    book: Book

    @ManyToOne(() => User, user => user.books)
    @JoinColumn({ name: 'user_id'})
    user: User
}
