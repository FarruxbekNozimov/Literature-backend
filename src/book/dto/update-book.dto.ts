import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({ example: 'Atomic Habits' })
  title?: string;

  @ApiProperty({ example: '234' })
  pages?: string;

  @ApiProperty({ example: '2018' })
  year?: string;

  @ApiProperty({ example: '12.99$' })
  price?: string;

  @ApiProperty({ example: '1' })
  country_id?: number;

  @ApiProperty({ example: '1' })
  author_id?: number;

  @ApiProperty({ example: '1' })
  category_id?: number;

  @ApiProperty({
    example:
      'A supremely practical and useful book. James Clear distils the most fundamental information about habit formation, so you can accomplish more by focusing on less.',
  })
  description?: string;

  @ApiProperty({ example: 'image.png' })
  book_cover: any;
}
