import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { Author } from './models/author.model';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [SequelizeModule.forFeature([Author]), JwtModule, ImageModule],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
