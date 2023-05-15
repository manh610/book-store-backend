import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ICreateUser } from './user.type';
import { Bill } from 'src/bill/bill.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Bill) private readonly billRepo: Repository<Bill>
    ){}

    async create(input: ICreateUser): Promise<User>{
        return await this.userRepo.save(input);
    }

    async findById(id: number): Promise<User>{
        return await this.userRepo.find({
            where: {id: id},
            relations: ['bills', 'bills.bookbills', 'bills.bookbills.book']
        })[0];
    }


    async findByBill(billId: number): Promise<User>{
        const bill = await this.billRepo
            .createQueryBuilder('bill')
            .innerJoinAndSelect('bill.user', 'user')
            .where('bill.id = :billId', {billId})
            .getOne();
        return bill?.user;
    }

    async findAll(): Promise<User[]> {
        return await this.userRepo.find({
            relations: ['bills', 'bills.bookbills', 'bills.bookbills.book']
        })
    }

}