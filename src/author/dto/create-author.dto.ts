import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: '1970' })
  date_birth: string;

  @ApiProperty({ example: '2023' })
  date_death: string;

  @ApiProperty({ example: '1' })
  country_id: number;

  @ApiProperty({ example: 'He like coding' })
  bio: string;
}
