import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Quotes } from './models/quotes.model';
import { CreateQuotesDto } from './dto/create-quotes.dto';
import { UpdateQuotesDto } from './dto/update-quotes.dto';

@Injectable()
export class QuotesService {
  constructor(@InjectModel(Quotes) private quotesRepo: typeof Quotes) { }

  async create(createQuotesDto: CreateQuotesDto) {
    const res = await this.quotesRepo.create(createQuotesDto);
    return res;
  }

  async findAll() {
    return await this.quotesRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.quotesRepo.findByPk(id);
  }

  async update(id: number, updateQuotesDto: UpdateQuotesDto) {
    return await this.quotesRepo.update(updateQuotesDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.quotesRepo.destroy({ where: { id } });
    return result;
  }
}
