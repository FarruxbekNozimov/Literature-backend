import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './models/book.model';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book) private bookRepo: typeof Book) { }

  async create(createBookDto: CreateBookDto) {
    const res = await this.bookRepo.create(createBookDto);
    return res;
  }

  async findAll() {
    return await this.bookRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.bookRepo.findByPk(id);
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.bookRepo.update(updateBookDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.bookRepo.destroy({ where: { id } });
    return result;
  }
}
