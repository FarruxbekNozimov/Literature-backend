import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthorDto {
  @ApiProperty({ example: 'James' })
  @IsString()
  first_name?: string;

  @ApiProperty({ example: 'Clear' })
  @IsString()
  last_name?: string;

  @ApiProperty({ example: '1985.11.22' })
  date_birth?: string;

  @ApiProperty({ example: 'live' })
  date_death?: string;

  @ApiProperty({ example: '1' })
  country_id?: number;

  @ApiProperty({
    example:
      'James Clear is an American author. Clear is the author of the book Atomic Habits.',
  })
  bio?: string;

  @ApiProperty({ example: 'image.png', type: 'string', format: 'binary' })
  image?: any;
}
