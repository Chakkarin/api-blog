import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostsEntity } from "./posts.entity";

@Entity('categories')
export class CategoriesEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cate_description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToMany(type => PostsEntity, post => post.category)
    post: PostsEntity[];
}