import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriesEntity } from "src/entities/categories.entity";
import { PostsEntity } from "src/entities/posts.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(PostsEntity) private readonly postsRepository: Repository<PostsEntity>,
        @InjectRepository(CategoriesEntity) private readonly categoriesEntity: Repository<CategoriesEntity>
    ) { }

    getAll() {
        return this.postsRepository.find({
            relations: ['category']
        });
    }

    getPostsByCateId(id: string) {
        return this.categoriesEntity.find(
            {
                relations: ['post'],
                where: {
                    id: id
                }
            }
        );
    }

    setPosts(posts: PostsEntity) {
        this.validatePosts(posts);
        return this.postsRepository.save(posts);
    }

    deletePosts(id: string) {
        return this.postsRepository.delete(id);
    }

    private validatePosts(post: PostsEntity) {
        if (!post.post_description) {
            throw new BadRequestException(`กรุณาระบุรายการโพส`);
        }
        if (!post.category) {
            throw new BadRequestException(`กรุณาระบุหมวดหมู่`);
        }
    }
}