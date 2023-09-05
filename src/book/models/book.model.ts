import { Comments } from '../../comments/models/comments.model';
import { Quotes } from '../../quotes/models/quotes.model';
import { Library } from '../../library/models/library.model';
import { Category } from "../../category/models/category.model";
import { Author } from "../../author/models/author.model";
import { Country } from "../../country/models/country.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface BookAttr {
  title:string
	pages:string
	year:string
	price:string
	country_id:number
	author_id:number
	category_id:number
	description:string
	book_cover:string
	
}

@Table({ tableName: 'book' })
export class Book extends Model<Book, BookAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;
  
  @Column({ type: DataType.STRING })
	title:string;

	@Column({ type: DataType.STRING })
	pages:string;

	@Column({ type: DataType.STRING })
	year:string;

	@Column({ type: DataType.STRING })
	price:string;

	@ForeignKey(() => Country)
	@Column({ type: DataType.INTEGER })
	country_id: number;
	@BelongsTo(() => Country)
	country: Country[];

	@ForeignKey(() => Author)
	@Column({ type: DataType.INTEGER })
	author_id: number;
	@BelongsTo(() => Author)
	author: Author[];

	@ForeignKey(() => Category)
	@Column({ type: DataType.INTEGER })
	category_id: number;
	@BelongsTo(() => Category)
	category: Category[];

	@Column({ type: DataType.STRING })
	description:string;

	@Column({ type: DataType.STRING })
	book_cover:string;

	@HasMany(() => Comments)
	comments: Comments[];

	@HasMany(() => Quotes)
	quotes: Quotes[];

	@HasMany(() => Library)
	library: Library[];

	
}
