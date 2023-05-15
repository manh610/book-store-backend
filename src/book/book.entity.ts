import {  User } from "src/user/user.entity";
import { BookBill } from "src/bookbill/bookbill.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "books"})
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    author: string

    @Column()
    date: Date

    @Column()
    category: string

    @Column()
    page: number

    @Column()
    sold: number

    @OneToMany(() => BookBill, bookbill => bookbill.book)
    bookbills: BookBill[]

    @ManyToOne(() => User, user => user.books)
    @JoinColumn({ name: 'user_id'})
    user: User
}
