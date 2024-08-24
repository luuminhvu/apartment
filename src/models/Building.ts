import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Area } from "./Area";
import { Floor } from "./Floor";

@Table({
  tableName: "buildings",
  timestamps: true,
})
export class Building extends Model<Building> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  address!: string;

  @ForeignKey(() => Area)
  @Column(DataType.INTEGER)
  areaId!: number;

  @BelongsTo(() => Area)
  area!: Area;

  @HasMany(() => Floor)
  floors!: Floor[];
}
