import { ApiProperty } from "@nestjs/swagger";
import { Book } from "src/book/book.entity";
import { User } from "src/user/user.entity";

export class ICreateRate {
    @ApiProperty()
    content: string

    @ApiProperty()
    rate: number

    @ApiProperty()
    userId: number

    @ApiProperty()
    bookId: number
}

export class IUpdateRate {
    @ApiProperty()
    id: number

    @ApiProperty()
    rate?: number
}

export interface IRateDTO {
    id: number,
    rate: number
}

export interface IRateDTOCreate {
    rate: number,
    user: User,
    book: Book
}

export class RateID {
    @ApiProperty()
    id: number
}