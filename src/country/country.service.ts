import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from './models/country.model';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountryService {
  constructor(@InjectModel(Country) private countryRepo: typeof Country) { }

  async create(createCountryDto: CreateCountryDto) {
    const res = await this.countryRepo.create(createCountryDto);
    return res;
  }

  async findAll() {
    return await this.countryRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.countryRepo.findByPk(id);
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    return await this.countryRepo.update(updateCountryDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.countryRepo.destroy({ where: { id } });
    return result;
  }
}
