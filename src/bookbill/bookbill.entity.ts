import { Bill } from "src/bill/bill.entity";
import { Book } from "src/book/book.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'bookbills'})
export class BookBill {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @ManyToOne(() => User, user => user.bookbills)
    @JoinColumn({ name: 'user_id'})
    user: User

    @ManyToOne(() => Book, book => book.bookbills)
    @JoinColumn({ name: 'book_id'})
    book: Book
}
