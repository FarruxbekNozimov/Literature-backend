import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: '+998887038006' })
  phone: string;

  @ApiProperty({ example: 'email@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Uzb@kis!0n' })
  password: string;
}
