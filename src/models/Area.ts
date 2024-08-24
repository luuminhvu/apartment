import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from "sequelize-typescript";
import { Building } from "./Building";

@Table({
  tableName: "areas",
  timestamps: true,
})
export class Area extends Model<Area> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  description!: string;

  @HasMany(() => Building)
  buildings!: Building[];
}
