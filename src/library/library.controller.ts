import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { LibraryService } from './library.service';

@ApiTags('Library')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @ApiOperation({ summary: 'Create a library' })
  @Post()
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.libraryService.create(createLibraryDto);
  }

  @ApiOperation({ summary: 'Get all library' })
  @Get()
  findAll() {
    return this.libraryService.findAll();
  }

  @ApiOperation({ summary: 'Get library' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.libraryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update library' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLibraryDto: UpdateLibraryDto,
  ) {
    return await this.libraryService.update(+id, updateLibraryDto);
  }

  @ApiOperation({ summary: 'Delete library' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.libraryService.delete(id);
  }
}
