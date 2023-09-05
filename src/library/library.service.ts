import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Library } from './models/library.model';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';

@Injectable()
export class LibraryService {
  constructor(@InjectModel(Library) private libraryRepo: typeof Library) { }

  async create(createLibraryDto: CreateLibraryDto) {
    const res = await this.libraryRepo.create(createLibraryDto);
    return res;
  }

  async findAll() {
    return await this.libraryRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.libraryRepo.findByPk(id);
  }

  async update(id: number, updateLibraryDto: UpdateLibraryDto) {
    return await this.libraryRepo.update(updateLibraryDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.libraryRepo.destroy({ where: { id } });
    return result;
  }
}
