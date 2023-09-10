import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCountryDto {
  @ApiProperty({ example: 'USA' })
  @IsString()
  name?: string;

  @ApiProperty({ example: 'openmoji:flag-united-states' })
  icon?: string;
}
