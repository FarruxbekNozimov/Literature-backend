import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLibraryDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  user_id?: number;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  book_id?: number;

  @ApiProperty({ example: '75' })
  @IsNotEmpty()
  page?: number;

  @ApiProperty({ example: 'false' })
  @IsBoolean()
  is_end?: boolean;
}
