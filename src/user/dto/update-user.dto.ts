import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John' })
  first_name?: string;

  @ApiProperty({ example: 'Doe' })
  last_name?: string;

  @ApiProperty({ example: '+998887038006' })
  phone?: string;

  @ApiProperty({ example: 'email@gmail.com' })
  email?: string;

  @ApiProperty({ example: 'Uzb@kis!0n' })
  password?: string;

  @ApiProperty({ example: 'image.png', type: 'string', format: 'binary' })
  image?: any;
}
