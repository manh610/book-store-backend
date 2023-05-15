import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { Bill } from './bill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookbillService } from 'src/bookbill/bookbill.service';
import { BookModule } from 'src/book/book.module';
import { BookbillModule } from 'src/bookbill/bookbill.module';
import { UserModule } from 'src/user/user.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Bill]),
		BookModule,
		BookbillModule,
		UserModule
	],
	exports: [TypeOrmModule.forFeature([Bill])],
	controllers: [BillController],
	providers: [BillService]
})
export class BillModule {}
