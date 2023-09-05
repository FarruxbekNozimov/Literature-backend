import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './models/book.model';

@Module({
  imports: [SequelizeModule.forFeature([Book]), JwtModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
