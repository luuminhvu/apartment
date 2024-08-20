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
import { Apartment } from "./Apartment";
import { User } from "./User";

@Table({
  tableName: "maintenance_requests",
  timestamps: true,
})
export class MaintenanceRequest extends Model<MaintenanceRequest> {
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

  @Column(DataType.DATE)
  requestDate!: Date;

  @Column(DataType.TEXT)
  description?: string;

  @Column(DataType.ENUM("submitted", "in_progress", "completed"))
  status!: "submitted" | "in_progress" | "completed";

  @BelongsTo(() => Apartment)
  apartment!: Apartment;

  @BelongsTo(() => User)
  tenant!: User;
}
