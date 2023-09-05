import { Book } from '../../book/models/book.model';
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

interface AuthorAttr {
  first_name:string
	last_name:string
	date_birth:string
	date_death:string
	country_id:number
	bio:string
	
}

@Table({ tableName: 'author' })
export class Author extends Model<Author, AuthorAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;
  
  @Column({ type: DataType.STRING })
	first_name:string;

	@Column({ type: DataType.STRING })
	last_name:string;

	@Column({ type: DataType.STRING })
	date_birth:string;

	@Column({ type: DataType.STRING })
	date_death:string;

	@ForeignKey(() => Country)
	@Column({ type: DataType.INTEGER })
	country_id: number;
	@BelongsTo(() => Country)
	country: Country[];

	@Column({ type: DataType.STRING })
	bio:string;

	@HasMany(() => Book)
	book: Book[];

	
}
