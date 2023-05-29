import { ApiProperty } from "@nestjs/swagger";

export class ICreateCategory {
    @ApiProperty()
    name: string
}