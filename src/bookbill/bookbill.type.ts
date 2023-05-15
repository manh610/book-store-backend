import { ApiProperty } from "@nestjs/swagger";
import { Book } from "src/book/book.entity";

export class ICreateBookBill {
    @ApiProperty()
    quantity: number

    @ApiProperty()
    bookId: number
}

export interface IBookDTO {
    quantity: number,
    book: Book
}