import { Controller, Post, Param, Get, Body } from '@nestjs/common';
import { RateService } from './rate.service';
import { ApiTags } from '@nestjs/swagger';
import { ICreateRate } from './rate.type';
import { failResponse, successResponse } from 'src/utils/http';
import { IDInteface } from 'src/utils/type';

@Controller('rate')
@ApiTags('Rates')
export class RateController {
    constructor(
        private readonly rateService: RateService
    ){}


    @Post()
    async create(@Body() input: ICreateRate): Promise<any> {
        try{    
            const check = await this.rateService.checkExist(input.bookId, input.userId);
            console.log(check)
            if ( check.length > 0 ) {
                const update  = await this.rateService.updateRate(check[0].id, input.rate);
                if ( update==null )
                    return failResponse('Update Rate Fail', 'UpdateFail')
                return successResponse(update);
            }
            const rate = await this.rateService.create(input);
            return successResponse(rate);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Post('/user')
    async findByUser(@Body() input: IDInteface): Promise<any> {
        try{    
            const rates = await this.rateService.findByUser(input.id);
            if (rates==null)
                return failResponse('Rate not found by user', 'NotFoundByUser');
            return successResponse(rates);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Post('/book')
    async findByBook(@Body() input: IDInteface): Promise<any> {
        try{    
            const rates = await this.rateService.findByBook(input.id);
            if (rates==null)
                return failResponse('Rate not found by book', 'NotFoundByBook');
            return successResponse(rates);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

}
