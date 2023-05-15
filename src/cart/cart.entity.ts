import { Customer } from "src/customer/customer.entity";
import { ShoeBill } from "src/shoebill/shoebill.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'carts' })
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Customer, customer => customer.bills)
    @JoinColumn({name: 'customer_id'})
    customer: Customer

    @OneToMany(() => ShoeBill, shoebill => shoebill.bill)
    shoebills: ShoeBill[]
}
