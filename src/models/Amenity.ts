import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from "sequelize-typescript";
import { Room } from "./Room";
import { RoomAmenity } from "./RoomAmenity";

@Table({
  tableName: "amenities",
  timestamps: true,
})
export class Amenity extends Model<Amenity> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @BelongsToMany(() => Room, () => RoomAmenity)
  rooms!: Room[];
}
