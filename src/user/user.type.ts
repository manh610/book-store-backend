import { ApiProperty } from "@nestjs/swagger";

export class ICreateUser {
    @ApiProperty()
    fullName: string

    @ApiProperty()
    username: string

    @ApiProperty()
    password: string

    @ApiProperty()
    role: string
}
