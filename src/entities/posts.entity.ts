import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoriesEntity } from "./categories.entity";
// import { CategoriesEntity } from "./categories.entity";
import { CommentsEntity } from "./comments.entity";

@Entity('posts')
export class PostsEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text")
    post_description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(type => CategoriesEntity, category => category.post)
    category: CategoriesEntity;

    @OneToMany(type => CommentsEntity, comment => comment.post)
    comments: CommentsEntity[];

}