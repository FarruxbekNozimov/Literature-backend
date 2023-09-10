import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorService } from './author.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '../pipes/image-validation.pipe';
import { AuthGuard } from '../guards/jwt-auth.guards';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({ summary: 'Create a author' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(
    @Body() createAuthorDto: CreateAuthorDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.authorService.create(createAuthorDto, image);
  }

  @ApiOperation({ summary: 'Get all author' })
  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @ApiOperation({ summary: 'Get author' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.authorService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update author' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return await this.authorService.update(+id, updateAuthorDto, image);
  }

  @ApiOperation({ summary: 'Delete author' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.authorService.delete(id);
  }
}
