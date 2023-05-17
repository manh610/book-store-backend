import { ApiProperty } from "@nestjs/swagger";
import { Book } from "src/book/book.entity";
import { User } from "src/user/user.entity";

export class ICreateBookBill {
    @ApiProperty()
    amount: number

    @ApiProperty()
    bookId: number

    @ApiProperty()
    userId: number
}

export interface IBookDTO {
    amount: number,
    book: Book,
    user: User
}