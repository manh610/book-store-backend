import { ApiProperty } from "@nestjs/swagger";
import { Book } from "src/book/book.entity";
import { User } from "src/user/user.entity";

export class ICreateComment {
    @ApiProperty()
    content: string

    @ApiProperty()
    userId: number

    @ApiProperty()
    bookId: number
}

export class IUpdateComment {
    @ApiProperty()
    id: number

    @ApiProperty()
    content?: string

}

export interface ICommentDTO {
    id: number,
    content: string,
}

export interface ICommentDTOCreate {
    content: string,
    user: User,
    book: Book
}

export class CommentID {
    @ApiProperty()
    id: number
}