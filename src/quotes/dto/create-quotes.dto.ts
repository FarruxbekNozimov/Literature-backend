import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuotesDto {
  @ApiProperty({
    example: 'Habits are the compound interest of self-improvement',
  })
  @IsString()
  quotes: string;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  book_id: number;
}
