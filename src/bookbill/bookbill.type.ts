import { ApiProperty } from "@nestjs/swagger";
import { Book } from "src/book/book.entity";

export class ICreateBookBill {
    @ApiProperty()
    amount: number

    @ApiProperty()
    bookId: number
}

export interface IBookDTO {
    amount: number,
    book: Book
}