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
import { CreateQuotesDto } from './dto/create-quotes.dto';
import { UpdateQuotesDto } from './dto/update-quotes.dto';
import { QuotesService } from './quotes.service';

@ApiTags('Quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @ApiOperation({ summary: 'Create a quotes' })
  @Post()
  create(@Body() createQuotesDto: CreateQuotesDto) {
    return this.quotesService.create(createQuotesDto);
  }

  @ApiOperation({ summary: 'Get all quotes' })
  @Get()
  findAll() {
    return this.quotesService.findAll();
  }

  @ApiOperation({ summary: 'Get quotes' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.quotesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update quotes' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateQuotesDto: UpdateQuotesDto,
  ) {
    return await this.quotesService.update(+id, updateQuotesDto);
  }

  @ApiOperation({ summary: 'Delete quotes' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.quotesService.delete(id);
  }
}
