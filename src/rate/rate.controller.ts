import { Controller, Post, Param, Get, Body } from '@nestjs/common';
import { RateService } from './rate.service';
import { ApiTags } from '@nestjs/swagger';
import { ICreateRate } from './rate.type';
import { failResponse, successResponse } from 'src/utils/http';

@Controller('rate')
@ApiTags('Rates')
export class RateController {
    constructor(
        private readonly rateService: RateService
    ){}


    @Post()
    async create(@Body() input: ICreateRate): Promise<any> {
        try{    
            const rate = await this.rateService.create(input);
            return successResponse(rate);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Get('/user/{userId}')
    async findByUser(@Param('userId') userId: number): Promise<any> {
        try{    
            const rates = await this.rateService.findByUser(userId);
            if (rates==null)
                return failResponse('Rate not found by user', 'NotFoundByUser');
            return successResponse(rates);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Get('/book/{bookId}')
    async findByBook(@Param('bookId') bookId: number): Promise<any> {
        try{    
            const rates = await this.rateService.findByBook(bookId);
            if (rates==null)
                return failResponse('Rate not found by book', 'NotFoundByBook');
            return successResponse(rates);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }
}
