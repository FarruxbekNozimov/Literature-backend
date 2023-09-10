import { Book } from '../../book/models/book.model';
import { User } from '../../user/models/user.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface LibraryAttr {
  user_id: number;
  book_id: number;
  page: number;
  is_end: boolean;
}

@Table({ tableName: 'library' })
export class Library extends Model<Library, LibraryAttr> {
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

  @Column({ type: DataType.STRING })
  page: number;

  @Column({ type: DataType.STRING })
  is_end: boolean;
}
