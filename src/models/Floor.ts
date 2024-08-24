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
import { Building } from "./Building";
import { Room } from "./Room";

@Table({
  tableName: "floors",
  timestamps: true,
})
export class Floor extends Model<Floor> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.INTEGER)
  floorNumber!: number;

  @ForeignKey(() => Building)
  @Column(DataType.INTEGER)
  buildingId!: number;

  @BelongsTo(() => Building)
  building!: Building;

  @HasMany(() => Room)
  rooms!: Room[];
}
