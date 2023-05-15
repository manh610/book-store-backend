import { Bill } from "src/bill/bill.entity";
import { Book } from "src/book/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullName: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    role: string

    @OneToMany(() => Book, book => book.user)
    books: Book[]

    @OneToMany(() => Bill, bill => bill.user)
    bills: Bill[];
    
}
