import { Comments } from '../../comments/models/comments.model';
import { Library } from '../../library/models/library.model';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface UserAttr {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  image: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  first_name: string;

  @Column({ type: DataType.STRING })
  last_name: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.STRING })
  image: string;

  @HasMany(() => Comments)
  comments: Comments[];

  @HasMany(() => Library)
  library: Library[];
}
