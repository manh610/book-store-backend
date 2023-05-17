import { ApiProperty } from "@nestjs/swagger";

export class IRegisterUser {
    @ApiProperty()
    fullName: string

    @ApiProperty()
    username: string

    @ApiProperty()
    password: string

    @ApiProperty()
    confirmPassword: string
}

export interface IUserCreate {
    fullName: string,
    username: string,
    password: string,
    role: string
}

export interface IUserDTO {
    id: number,
    fullName: string,
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