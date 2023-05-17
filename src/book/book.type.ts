import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/user.entity";

export class ICreateBook {
    @ApiProperty()
    title: string

    @ApiProperty()
    category: string

    @ApiProperty()
    author: string

    @ApiProperty()
    date: Date

    @ApiProperty()
    userId: number

    @ApiProperty()
    page: number

    @ApiProperty()
    sold: number

    @ApiProperty()
    price: number

    @ApiProperty()
    imageUrl: string

    @ApiProperty()
    description: string
}

export class IUpdateBook {
    @ApiProperty()
    id: number

    @ApiProperty()
    title?: string

    @ApiProperty()
    category?: string

    @ApiProperty()
    author?: string

    @ApiProperty()
    date?: Date

    @ApiProperty()
    page?: number

    @ApiProperty()
    sold?: number

    @ApiProperty()
    imageUrl?: string

    @ApiProperty()
    description?: string

    @ApiProperty()
    price?: number
}

export interface BookDTO {
    id: number,
    title: string,
    author: string,
    category: string,
    page: number,
    sold: number,
    date: Date,
    imageUrl: string,
    description: string,
    price: number
}

export interface BookDTOCreate {
    title: string,
    author: string,
    category: string,
    page: number,
    sold: number,
    date: Date,
    imageUrl: string,
    description: string,
    price: number,
    user: User
}

export class BookID {
    @ApiProperty()
    id: number
}