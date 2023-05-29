import {  User } from "src/user/user.entity";
import { Comment } from "src/comment/comment.entity";
import { BookBill } from "src/bookbill/bookbill.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rate } from "src/rate/rate.entity";
import { Category } from "src/category/category.entity";

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
    page: number

    @Column()
    price: number

    @Column()
    sold: number

    @Column()
    imageUrl: string

    @Column('longtext')
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

    @ManyToOne(() => Category, category => category.books)
    @JoinColumn({ name: 'category_id'})
    category: Category
}
