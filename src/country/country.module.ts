import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { Country } from './models/country.model';

@Module({
  imports: [SequelizeModule.forFeature([Country]), JwtModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
