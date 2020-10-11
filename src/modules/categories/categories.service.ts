import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriesEntity } from "src/entities/categories.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoriesEntity)
        private readonly categoriesRepository: Repository<CategoriesEntity>) { }


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

    deleteCategory(id: string) {
        return this.categoriesRepository.delete(id);
    }

    private validateDescription(categories: CategoriesEntity) {
        if (!categories.cate_description) {
            throw new BadRequestException(`categories ไม่ควรเป็นค่าว่าง`);
        }
    }

}