import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './models/author.model';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author) private authorRepo: typeof Author) { }

  async create(createAuthorDto: CreateAuthorDto) {
    const res = await this.authorRepo.create(createAuthorDto);
    return res;
  }

  async findAll() {
    return await this.authorRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.authorRepo.findByPk(id);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return await this.authorRepo.update(updateAuthorDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.authorRepo.destroy({ where: { id } });
    return result;
  }
}
