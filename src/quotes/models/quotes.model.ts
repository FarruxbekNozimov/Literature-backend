import { Book } from "../../book/models/book.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface QuotesAttr {
  quotes:string
	book_id:number
	
}

@Table({ tableName: 'quotes' })
export class Quotes extends Model<Quotes, QuotesAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;
  
  @Column({ type: DataType.STRING })
	quotes:string;

	@ForeignKey(() => Book)
	@Column({ type: DataType.INTEGER })
	book_id: number;
	@BelongsTo(() => Book)
	book: Book[];

	
}
