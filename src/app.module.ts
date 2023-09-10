import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { Author } from './author/models/author.model';
import { Book } from './book/models/book.model';
import { Category } from './category/models/category.model';
import { Comments } from './comments/models/comments.model';
import { Country } from './country/models/country.model';
import { Library } from './library/models/library.model';
import { Quotes } from './quotes/models/quotes.model';
import { User } from './user/models/user.model';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { CommentsModule } from './comments/comments.module';
import { CountryModule } from './country/country.module';
import { LibraryModule } from './library/library.module';
import { QuotesModule } from './quotes/quotes.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: resolve(__dirname, 'static') }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: String(process.env.PG_PASSWORD),
      database: process.env.PG_DB,
      autoLoadModels: true,
      logging: false,
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      models: [
        User,
        Author,
        Book,
        Category,
        Comments,
        Country,
        Library,
        Quotes,
      ],
    }),
    UserModule,
    AuthorModule,
    BookModule,
    CategoryModule,
    CommentsModule,
    CountryModule,
    LibraryModule,
    QuotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
