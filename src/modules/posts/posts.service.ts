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
            relations: ['category', 'comments']
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

    async deletePosts(id: string) {
        const chkData = await this.postsRepository.findOne({
            relations: ['comments'],
            where: {
                id: id,
            }
        })

        if (chkData.comments.length !== 0) {
            throw new BadRequestException(`ไม่สามารถลบได้เนื่องจากมี FK กับ comment แล้ว`);
        }

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