import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request } from "@nestjs/common";
import { request } from "http";
import { CategoriesService } from "./categories.service";

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }

    @Get()
    findAll() {
        return this.categoriesService.getAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoriesService.getCategoryById(id);
    }

    @Post()
    createCategory(@Body() body) {
        return this.categoriesService.createCategory(body);
    }

    @Patch()
    updateCategory(@Body() body) {
        return this.categoriesService.updateCategory(body);
    }

    @Delete(':id')
    deleteCategory(@Param('id') id: string) {
        return this.categoriesService.deleteCategory(id);
    }
}
