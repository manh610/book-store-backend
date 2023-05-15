import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), UserModule],
  exports: [TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
