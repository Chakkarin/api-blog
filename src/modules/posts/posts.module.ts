import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesEntity } from "src/entities/categories.entity";
import { PostsEntity } from "src/entities/posts.entity";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";



@Module({
    imports: [TypeOrmModule.forFeature([PostsEntity, CategoriesEntity])],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule { }
