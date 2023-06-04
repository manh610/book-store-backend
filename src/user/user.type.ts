import { ApiProperty } from "@nestjs/swagger";

export class IRegisterUser {
    @ApiProperty()
    email: string

    @ApiProperty()
    username: string

    @ApiProperty()
    password: string

    @ApiProperty()
    confirmPassword: string
}

export interface IUserCreate {
    email: string,
    username: string,
    password: string,
    role: string
}

export interface IUserDTO {
    id: number,
    email: string,
    username: string,
    password: string,
    role: string
}

export class ILogin {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string
}