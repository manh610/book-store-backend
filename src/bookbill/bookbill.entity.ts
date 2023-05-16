import { Bill } from "src/bill/bill.entity";
import { Book } from "src/book/book.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'bookbills'})
export class BookBill {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @ManyToOne(() => Bill, bill => bill.bookbills)
    @JoinColumn({ name: 'bill_id'})
    bill: Bill

    @ManyToOne(() => Book, book => book.bookbills)
    @JoinColumn({ name: 'book_id'})
    book: Book
}
