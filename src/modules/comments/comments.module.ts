import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsEntity } from "src/entities/comments.entity";
import { PostsEntity } from "src/entities/posts.entity";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";




@Module({
    imports: [TypeOrmModule.forFeature([CommentsEntity])],
    controllers: [CommentsController],
    providers: [CommentsService],
})
export class CommentsModule { }
