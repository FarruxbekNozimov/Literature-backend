import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'Atomic Habits' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '234' })
  @IsNotEmpty()
  pages: string;

  @ApiProperty({ example: '2018' })
  @IsNotEmpty()
  year: string;

  @ApiProperty({ example: '12.99$' })
  @IsNotEmpty()
  price: string;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  country_id: number;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  author_id: number;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  category_id: number;

  @ApiProperty({
    example:
      'A supremely practical and useful book. James Clear distils the most fundamental information about habit formation, so you can accomplish more by focusing on less.',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'image.png', type: 'string', format: 'binary' })
  book_cover: any;
}
