import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import { Room } from "./Room";
import { Amenity } from "./Amenity";

@Table({
  tableName: "room_amenities",
  timestamps: false,
})
export class RoomAmenity extends Model<RoomAmenity> {
  @ForeignKey(() => Room)
  @Column(DataType.INTEGER)
  roomId!: number;

  @ForeignKey(() => Amenity)
  @Column(DataType.INTEGER)
  amenityId!: number;
}
