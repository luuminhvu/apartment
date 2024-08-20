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
  tableName: "notifications",
  timestamps: true,
})
export class Notification extends Model<Notification> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.TEXT)
  message?: string;

  @Column(DataType.DATE)
  sentAt!: Date;

  @Column(DataType.DATE)
  readAt?: Date;

  @Column(DataType.ENUM("sent", "read", "archived"))
  status!: "sent" | "read" | "archived";

  @BelongsTo(() => User)
  user!: User;
}
