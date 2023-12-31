import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ImageService } from '../image/image.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    private readonly imageService: ImageService,
    private readonly jwtService: JwtService,
  ) {}

  async getToken(id: number, role: string) {
    const payload = { id, role };
    return this.jwtService.signAsync(payload, {
      secret: process.env.TOKEN_KEY,
      expiresIn: process.env.TOKEN_TIME,
    });
  }

  async create(createUserDto: CreateUserDto) {
    const { email, phone, password } = createUserDto;
    const is_user = await this.findByEmail(email);
    const is_phone = await this.findByPhone(phone);
    if (is_user)
      throw new HttpException(`User is already exist`, HttpStatus.BAD_REQUEST);
    if (is_phone)
      throw new HttpException(`User is already exist`, HttpStatus.BAD_REQUEST);

    const hashedPassword = await bcrypt.hash(password, 7);

    const user = await this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const token = await this.getToken(user.id, 'USER');

    return { user: await this.findOne(user.id), token };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const is_user = await this.findByEmail(email);
    if (!is_user)
      throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);

    const isPasswordValid = await bcrypt.compare(password, is_user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }
    const token = await this.getToken(is_user.id, 'USER');
    return { user: await this.findOne(is_user.id), token };
  }

  async findAll() {
    return await this.userRepo.findAll({
      attributes: { exclude: ['password'] },
      include: { all: true, nested: true },
    });
  }

  async findOne(id: number) {
    return await this.userRepo.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  async findByEmail(email: string) {
    const res = await this.userRepo.findOne({ where: { email } });
    return res;
  }

  async findByPhone(phone: string) {
    return await this.userRepo.findOne({ where: { phone } });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    image: Express.Multer.File,
  ) {
    const user = await this.findOne(id);
    const { password, confirm_password } = updateUserDto;

    const isPasswordValid = await bcrypt.compare(
      confirm_password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    if (image) {
      if (user.image) {
        await this.userRepo.update({ image: null }, { where: { id } });
        await this.imageService.remove(user.image);
      }
      const fileName = await this.imageService.create(image);
      await this.userRepo.update({ image: fileName }, { where: { id } });
    }

    await this.userRepo.update(
      { ...updateUserDto, password: hashedPassword },
      { where: { id } },
    );
    return this.findOne(id);
  }

  async delete(id: number): Promise<number> {
    const result = await this.userRepo.destroy({ where: { id } });
    return result;
  }
}
