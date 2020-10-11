import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostsEntity } from "./posts.entity";

@Entity('categories')
export class CategoriesEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cate_description: string;

    @Column()
    created_at: Date;

    @OneToMany(type => PostsEntity, post => post.categories)
    post: PostsEntity[];
}