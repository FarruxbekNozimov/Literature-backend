import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const res = await this.userRepo.create(createUserDto);
    return res;
  }

  async findAll() {
    return await this.userRepo.findAll({
      include: { all: true, nested: true },
    });
  }

  async findOne(id: number) {
    return await this.userRepo.findByPk(id);
  }

  async findByEmail(email: string) {
    console.log(await this.userRepo.findOne({ where: { email } }));
    return await this.userRepo.findOne({ where: { email } });
  }

  async findByPhone(phone: string) {
    return await this.userRepo.findOne({ where: { phone } });
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
