import { Controller, Post, Param, Get, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';
import { ICreateComment } from './comment.type';
import { failResponse, successResponse } from 'src/utils/http';

@Controller('comment')
@ApiTags('Comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ){}


    @Post()
    async create(@Body() input: ICreateComment): Promise<any> {
        try{    
            const comment = await this.commentService.create(input);
            return successResponse(comment);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Get('/user/{userId}')
    async findByUser(@Param('userId') userId: number): Promise<any> {
        try{    
            const comments = await this.commentService.findByUser(userId);
            if (comments==null)
                return failResponse('Comment not found by user', 'NotFoundByUser');
            return successResponse(comments);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }

    @Get('/book/{bookId}')
    async findByBook(@Param('bookId') bookId: number): Promise<any> {
        try{    
            const comments = await this.commentService.findByBook(bookId);
            if (comments==null)
                return failResponse('Comment not found by book', 'NotFoundByBook');
            return successResponse(comments);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException');
        }
    }
}
