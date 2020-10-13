import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";


@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService) { }

    @Get()
    findAll() {
        return this.postsService.getAll();
    }

    @Get(":id")
    findPostsByCateID(@Param('id') id: string) {
        return this.postsService.getPostsByCateId(id);
    }

    @Post()
    createPosts(@Body() body) {
        return this.postsService.setPosts(body);
    }

    @Patch()
    updatePosts(@Body() body) {
        return this.postsService.setPosts(body);
    }

    @Delete(':id')
    deletePosts(@Param('id') id: string) {
        return this.postsService.deletePosts(id);
    }

}