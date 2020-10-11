import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostsEntity } from "./posts.entity";

@Entity('comments')
export class CommentsEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('text')
    comment_description: string;

    @Column()
    create: Date;

    @ManyToOne(type => PostsEntity, post => post.comments)
    post: PostsEntity;
}