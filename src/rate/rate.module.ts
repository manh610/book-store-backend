import { Module, forwardRef } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './rate.entity';
import { UserModule } from 'src/user/user.module';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rate]), 
    forwardRef(() => BookModule),
		forwardRef(() => UserModule)
  ],
  exports: [TypeOrmModule.forFeature([Rate])],
  controllers: [RateController],
  providers: [RateService]
})
export class RateModule {}
