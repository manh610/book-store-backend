import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { BillModule } from '../bill/bill.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		forwardRef(() => BillModule)
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
