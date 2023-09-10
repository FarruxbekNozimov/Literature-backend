import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookService } from './book.service';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a book' })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @ApiOperation({ summary: 'Get all book' })
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @ApiOperation({ summary: 'Get book' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update book' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.bookService.update(+id, updateBookDto);
  }

  @ApiOperation({ summary: 'Delete book' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.bookService.delete(id);
  }
}
