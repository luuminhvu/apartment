import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

@Table({
  tableName: "service_providers",
  timestamps: true,
})
export class ServiceProvider extends Model<ServiceProvider> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.ENUM("cleaning", "plumbing", "electricity", "general"))
  serviceType!: "cleaning" | "plumbing" | "electricity" | "general";

  @Column(DataType.STRING)
  phoneNumber?: string;

  @Column(DataType.STRING)
  email?: string;

  @Column(DataType.TEXT)
  address?: string;
}
