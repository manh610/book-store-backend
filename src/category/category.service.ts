import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateCategory } from './category.type';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category) private readonly categoryRepo: Repository<Category>
    ) {}

    async findAll(): Promise<Category[]> {
        return await this.categoryRepo.find();
    }

    async findById(id: number): Promise<any> {
        return await this.categoryRepo.findOne({
            where: {
                id: id,
            }
        });
    }

    async create(input: ICreateCategory): Promise<Category>{
        console.log('create cateogry')
        try {
            const res = await this.categoryRepo.save(input);
            return res;
        } catch(err) {
            console.log(err)
        }
    }
}
