import { Module, forwardRef } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { UserModule } from 'src/user/user.module';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]), 
    forwardRef(() => BookModule),
		forwardRef(() => UserModule)
  ],
  exports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
