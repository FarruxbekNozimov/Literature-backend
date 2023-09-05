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
import { CreateCommentsDto } from './dto/create-comments.dto';
import { UpdateCommentsDto } from './dto/update-comments.dto';
import { CommentsService } from './comments.service';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Create a comments' })
  @Post()
  create(@Body() createCommentsDto: CreateCommentsDto) {
    return this.commentsService.create(createCommentsDto);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @ApiOperation({ summary: 'Get comments' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update comments' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCommentsDto: UpdateCommentsDto,
  ) {
    return await this.commentsService.update(+id, updateCommentsDto);
  }

  @ApiOperation({ summary: 'Delete comments' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.commentsService.delete(id);
  }
}
