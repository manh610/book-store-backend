import { Module, forwardRef } from '@nestjs/common';
import { BookbillController } from './bookbill.controller';
import { BookbillService } from './bookbill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookBill } from './bookbill.entity';
import { BookModule } from 'src/book/book.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([BookBill]),
		forwardRef(() => BookModule)
	],
	providers: [BookbillService],
	controllers: [BookbillController],
	exports: [TypeOrmModule.forFeature([BookBill])],
})
export class BookbillModule {}
