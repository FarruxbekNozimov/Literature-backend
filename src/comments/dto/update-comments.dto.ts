import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentsDto {
  @ApiProperty({ example: '1' })
  user_id?: number;

  @ApiProperty({ example: '1' })
  book_id?: number;
}
