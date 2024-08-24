import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./User";
import { Floor } from "./Floor";

@Table({
  tableName: "rooms",
  timestamps: true,
})
export class Room extends Model<Room> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  roomNumber!: string;

  @Column(DataType.INTEGER)
  area!: number;

  @Column(DataType.STRING)
  roomType!: string;

  @Column(DataType.TEXT)
  amenities!: string;

  @Column(DataType.DECIMAL)
  rentPrice!: number;

  @Column(DataType.INTEGER)
  totalSlots!: number;

  @Column(DataType.INTEGER)
  occupiedSlots!: number;

  @Column(DataType.VIRTUAL)
  availableSpace!: string;

  @Column(DataType.ENUM("full", "not-rented", "under repair", "available"))
  status!: "full" | "not-rented" | "under repair" | "available";

  @HasMany(() => User)
  users!: User[];

  @ForeignKey(() => Floor)
  @Column(DataType.INTEGER)
  floorId!: number;

  @BelongsTo(() => Floor)
  floor!: Floor;

  public getAvailableSpace(): string {
    const fraction = this.totalSlots - this.occupiedSlots;
    const fractionString = `${fraction}/${this.totalSlots}`;
    return fractionString;
  }
}
