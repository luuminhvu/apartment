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
import { Apartment } from "./Apartment";

@Table({
  tableName: "rentals",
  timestamps: true,
})
export class Rental extends Model<Rental> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Apartment)
  @Column(DataType.INTEGER)
  apartmentId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  tenantId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  landlordId!: number;

  @Column(DataType.DATE)
  startDate!: Date;

  @Column(DataType.DATE)
  endDate?: Date;

  @Column(DataType.DECIMAL(10, 2))
  monthlyRent!: number;

  @Column(DataType.ENUM("active", "terminated"))
  status!: "active" | "terminated";

  @BelongsTo(() => Apartment)
  apartment!: Apartment;

  @BelongsTo(() => User, "tenantId")
  tenant!: User;

  @BelongsTo(() => User, "landlordId")
  landlord!: User;
}
