import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryRepo: typeof Category) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const res = await this.categoryRepo.create(createCategoryDto);
    return res;
  }

  async findAll() {
    return await this.categoryRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.categoryRepo.findByPk(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepo.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.categoryRepo.destroy({ where: { id } });
    return result;
  }
}
