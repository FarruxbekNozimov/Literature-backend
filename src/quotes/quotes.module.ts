import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { Quotes } from './models/quotes.model';

@Module({
  imports: [SequelizeModule.forFeature([Quotes]), JwtModule],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
