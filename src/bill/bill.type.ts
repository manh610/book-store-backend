import { ApiProperty } from "@nestjs/swagger";
// import { ICreateUser } from "src/user/user.type";

export class ICreateBill {

    @ApiProperty()
    userId: number

    @ApiProperty()
    bookBills: BookBillCreate[]
}

class BookBillCreate {
    @ApiProperty()
    amount: number

    @ApiProperty()
    bookId: number
}