import { Author } from '../../author/models/author.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface CountryAttr {
  name:string
	icon:string
	
}

@Table({ tableName: 'country' })
export class Country extends Model<Country, CountryAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;
  
  @Column({ type: DataType.STRING })
	name:string;

	@Column({ type: DataType.STRING })
	icon:string;

	@HasMany(() => Author)
	author: Author[];

	
}
