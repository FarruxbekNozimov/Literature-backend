import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'adminjon1' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '!adminjon1' })
  readonly password: string;
}
