import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, phone } = createUserDto;
    const user = await this.userService.findByEmail(email);
    const is_phone = await this.userService.findByPhone(phone);
    if (user)
      throw new HttpException(`Bunday user mavjud`, HttpStatus.BAD_REQUEST);
    if (is_phone)
      throw new HttpException(
        `Bu telefon raqam avval ishlatilgan`,
        HttpStatus.BAD_REQUEST,
      );

    const token = await this.getToken(user.id, 'USER');

    const response = { message: 'LOGGED', user, token };
    return response;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    if (!user || user.password != password)
      throw new HttpException(
        `Bunday user mavjud emas`,
        HttpStatus.BAD_REQUEST,
      );
    const token = await this.getToken(user.id, 'USER');

    const response = { message: 'LOGGED', user, token };
    return response;
  }

  async getToken(id: number, role: string) {
    const payload = { id, role };
    return {
      token: this.jwtService.signAsync(payload, {
        secret: process.env.TOKEN_KEY,
        expiresIn: process.env.TOKEN_TIME,
      }),
    };
  }
}
