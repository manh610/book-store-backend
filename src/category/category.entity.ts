import { Book } from "src/book/book.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name: 'categories'})
export class Category {
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Book, book => book.category)
    books: Book[]
}
