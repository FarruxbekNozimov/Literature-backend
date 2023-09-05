import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';
import { Library } from './models/library.model';

@Module({
  imports: [SequelizeModule.forFeature([Library]), JwtModule],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
