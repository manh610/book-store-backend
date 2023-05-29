import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { IUserCreate } from './user.type';
import { Bill } from 'src/bill/bill.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ){}

    async create(input: IUserCreate): Promise<User>{
        return await this.userRepo.save(input);
    }

    async findById(id: number): Promise<User>{
        return await this.userRepo.find({
            where: {id: id},
        })[0];
    }

    async findByUsername(username: string): Promise<User>{
        return await this.userRepo.findOne({
            where: {username: username},
        });
    }

    async checkLogin(username: string, password: string): Promise<User> {
        return await this.userRepo.findOne({where: {username: username, password: password}})
    }

    async changeToAdmin(id: number): Promise<any> {
        await this.userRepo.update(id, {role: 'ADMIN'});
        return await this.userRepo.findOne({where: {id: id}})
    }

    async findAll(): Promise<User[]> {
        return await this.userRepo.find()
    }

}