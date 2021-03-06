import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriesEntity } from "src/entities/categories.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoriesEntity) private readonly categoriesRepository: Repository<CategoriesEntity>) { }


    getAll() {
        return this.categoriesRepository.find();
    }

    getCategoryById(id: string) {
        return this.categoriesRepository.findOne(id);
    }

    async createCategory(categories: CategoriesEntity) {
        this.validateDescription(categories);
        return await this.categoriesRepository.save(categories);
    }

    async updateCategory(categories: CategoriesEntity) {
        this.validateDescription(categories);
        return await this.categoriesRepository.save(categories);
    }

    async deleteCategory(id: string) {
        const chkData = await this.categoriesRepository.findOne({
            relations: ['post'],
            where: {
                id: id,
            }
        })

        if (chkData.post.length !== 0) {
            throw new BadRequestException(`ไม่สามารถลบได้เนื่องจากมี FK กับโพสแล้ว`);
        }

        return this.categoriesRepository.delete(id);
    }

    private validateDescription(categories: CategoriesEntity) {
        if (!categories.cate_description) {
            throw new BadRequestException(`categories ไม่ควรเป็นค่าว่าง`);
        }
    }

}