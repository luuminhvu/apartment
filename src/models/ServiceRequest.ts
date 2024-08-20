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
import { MaintenanceRequest } from "./MaintenanceRequest";
import { ServiceProvider } from "./ServiceProvider";

@Table({
  tableName: "service_requests",
  timestamps: true,
})
export class ServiceRequest extends Model<ServiceRequest> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => MaintenanceRequest)
  @Column(DataType.INTEGER)
  maintenanceRequestId!: number;

  @ForeignKey(() => ServiceProvider)
  @Column(DataType.INTEGER)
  serviceProviderId!: number;

  @Column(DataType.DATE)
  assignedDate!: Date;

  @Column(DataType.DATE)
  completedDate?: Date;

  @Column(DataType.ENUM("assigned", "in_progress", "completed"))
  status!: "assigned" | "in_progress" | "completed";

  @BelongsTo(() => MaintenanceRequest)
  maintenanceRequest!: MaintenanceRequest;

  @BelongsTo(() => ServiceProvider)
  serviceProvider!: ServiceProvider;
}
