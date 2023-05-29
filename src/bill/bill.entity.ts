import { User } from "src/user/user.entity";
import { BookBill } from "src/bookbill/bookbill.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'bills' })
export class Bill {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createAt: Date = new Date(Date.now())

    @ManyToOne(() => User, user => user.bills)
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToMany(() => BookBill, bookbill => bookbill.bill)
    bookbills: BookBill[]
}
