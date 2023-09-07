import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: '+998887038006' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Uzb@kis!0n' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'HEQJLAM.png' })
  @IsString()
  user_photo: string;
}
