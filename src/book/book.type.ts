import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/user.entity";

export class ICreateBook {
    @ApiProperty()
    name: string

    @ApiProperty()
    price: number

    @ApiProperty()
    description: string

    @ApiProperty()
    imageUrl: string

    @ApiProperty()
    userId: number

    @ApiProperty()
    quantity: number
}

export class IUpdateBook {
    @ApiProperty()
    id: number

    @ApiProperty()
    name?: string

    @ApiProperty()
    price?: number

    @ApiProperty()
    description?: string

    @ApiProperty()
    imageUrl?: string

    @ApiProperty()
    quantity?: number
}

export interface BookDTO {
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    price: number,
    quantity: number
}

export interface BookDTOCreate {
    name: string,
    description: string,
    imageUrl: string,
    price: number,
    quantity: number,
    user: User
}

export class BookID {
    @ApiProperty()
    id: number
}