import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";

@Table({
  tableName: "apartments",
  timestamps: true,
})
export class Apartment extends Model<Apartment> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  ownerId!: number;

  @Column(DataType.STRING)
  buildingName!: string;

  @Column(DataType.STRING)
  apartmentNumber!: string;

  @Column(DataType.INTEGER)
  floor!: number;

  @Column(DataType.INTEGER)
  numberOfBedrooms!: number;

  @Column(DataType.INTEGER)
  numberOfBathrooms!: number;

  @Column(DataType.INTEGER)
  squareFeet!: number;

  @Column(DataType.DECIMAL(10, 2))
  rent!: number;

  @Column(DataType.ENUM("available", "rented", "maintenance"))
  status!: "available" | "rented" | "maintenance";

  @BelongsTo(() => User)
  owner!: User;
}
