import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepo: typeof User) { }

  async create(createUserDto: CreateUserDto) {
    const res = await this.userRepo.create(createUserDto);
    return res;
  }

  async findAll() {
    return await this.userRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.userRepo.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(updateUserDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.userRepo.destroy({ where: { id } });
    return result;
  }
}
