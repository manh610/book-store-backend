import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
		TypeOrmModule.forFeature([Category]),
	],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [TypeOrmModule.forFeature([Category])],
})
export class CategoryModule {}
