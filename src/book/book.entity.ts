import {  User } from "src/user/user.entity";
import { Comment } from "src/comment/comment.entity";
import { BookBill } from "src/bookbill/bookbill.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rate } from "src/rate/rate.entity";

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
    price: number

    @Column()
    sold: number

    @Column()
    imageUrl: string

    @Column()
    description: string

    @OneToMany(() => BookBill, bookbill => bookbill.book)
    bookbills: BookBill[]

    @OneToMany(() => Comment, comment => comment.book)
    comments: Comment[]

    @OneToMany(() => Rate, rate => rate.book)
    rates: Comment[]

    @ManyToOne(() => User, user => user.books)
    @JoinColumn({ name: 'user_id'})
    user: User
}
