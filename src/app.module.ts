import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { BillModule } from './bill/bill.module';
import { UserModule } from './user/user.module';
import { BookbillModule } from './bookbill/bookbill.module';
import { BookBill } from './bookbill/bookbill.entity';
import { Bill } from './bill/bill.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { User } from './user/user.entity';
import { Book } from './book/book.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			username: 'root',
			password: 'root',
			database: 'laptrinhweb',
			entities: [User, Book, BookBill, Bill],
			synchronize: true,
		}),
		JwtModule.register({
			secret: 'scre',
			signOptions: {
				expiresIn: '4h'
			}
		}),
		BookModule,
		BillModule,
		UserModule,
		BookbillModule,
	],
	controllers: [
		AppController
	],
	providers: [AppService, AuthService],
})
export class AppModule {}

