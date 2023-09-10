import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './models/author.model';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ImageService } from '../image/image.service';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author) private authorRepo: typeof Author,
    private readonly imageService: ImageService,
  ) {}

  async create(createAuthorDto: CreateAuthorDto, image: Express.Multer.File) {
    let fileName = null;
    if (image) fileName = await this.imageService.create(image);
    else throw new HttpException(`Photo is required`, HttpStatus.BAD_REQUEST);

    const res = await this.authorRepo.create({
      ...createAuthorDto,
      image: fileName,
    });
    return res;
  }

  async findAll() {
    return await this.authorRepo.findAll({
      include: { all: true, nested: true },
    });
  }

  async findOne(id: number) {
    return await this.authorRepo.findByPk(id);
  }

  async update(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
    image: Express.Multer.File,
  ) {
    const author = await this.findOne(id);

    if (image) {
      if (author.image) {
        await this.authorRepo.update({ image: null }, { where: { id } });
        await this.imageService.remove(author.image);
      }
      const fileName = await this.imageService.create(image);
      await this.authorRepo.update({ image: fileName }, { where: { id } });
    }

    await this.authorRepo.update(updateAuthorDto, { where: { id } });
    return this.findOne(id);
  }

  async delete(id: number): Promise<number> {
    const result = await this.authorRepo.destroy({ where: { id } });
    return result;
  }
}
