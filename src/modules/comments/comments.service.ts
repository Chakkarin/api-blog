import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentsEntity } from "src/entities/comments.entity";
import { PostsEntity } from "src/entities/posts.entity";
import { Repository } from "typeorm";


@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(CommentsEntity) private readonly commentsRepository: Repository<CommentsEntity>,
    ) { }

    getAll() {
        return this.commentsRepository.find({
            relations: ['post']
        });
    }

    setComments(comments: CommentsEntity) {
        this.validateComments(comments);
        return this.commentsRepository.save(comments);
    }

    deleteComments(id: string) {
        return this.commentsRepository.delete(id);
    }

    private validateComments(comments: CommentsEntity) {
        if (!comments.comment_description) {
            throw new BadRequestException(`กรุณาระบุรายละเอียดความคิดเห็น`);
        }
        if (!comments.post) {
            throw new BadRequestException(`กรุณาระบุ id โพส`);
        }
    }
}