import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'Uzb@kis!0n' })
  readonly password: string;
}
