import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from './models/comments.model';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { UpdateCommentsDto } from './dto/update-comments.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comments) private commentsRepo: typeof Comments) { }

  async create(createCommentsDto: CreateCommentsDto) {
    const res = await this.commentsRepo.create(createCommentsDto);
    return res;
  }

  async findAll() {
    return await this.commentsRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.commentsRepo.findByPk(id);
  }

  async update(id: number, updateCommentsDto: UpdateCommentsDto) {
    return await this.commentsRepo.update(updateCommentsDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.commentsRepo.destroy({ where: { id } });
    return result;
  }
}
