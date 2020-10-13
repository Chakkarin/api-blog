import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CommentsService } from "./comments.service";


@Controller('comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) { }

    @Get()
    findAll() {
        return this.commentsService.getAll();
    }

    @Post()
    createComments(@Body() body) {
        return this.commentsService.setComments(body);
    }

    @Patch()
    updateComments(@Body() body) {
        return this.commentsService.setComments(body);
    }

    @Delete(':id')
    deleteComments(@Param('id') id: string) {
        return this.commentsService.deleteComments(id);
    }

}