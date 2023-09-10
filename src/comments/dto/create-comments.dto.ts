import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentsDto {
  @ApiProperty({ example: '1' })
  user_id: number;

  @ApiProperty({ example: '1' })
  book_id: number;
}
