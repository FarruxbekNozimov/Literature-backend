import { Book } from "../../book/models/book.model";
import { User } from "../../user/models/user.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface CommentsAttr {
  user_id:number
	book_id:number
	
}

@Table({ tableName: 'comments' })
export class Comments extends Model<Comments, CommentsAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;
  
  @ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	user_id: number;
	@BelongsTo(() => User)
	user: User[];

	@ForeignKey(() => Book)
	@Column({ type: DataType.INTEGER })
	book_id: number;
	@BelongsTo(() => Book)
	book: Book[];

	
}
