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
  tableName: "access_logs",
  timestamps: true,
})
export class AccessLog extends Model<AccessLog> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @Column(DataType.STRING)
  accessPoint!: string;

  @Column(DataType.DATE)
  accessTime!: Date;

  @Column(DataType.ENUM("entry", "exit"))
  accessType!: "entry" | "exit";

  @BelongsTo(() => User)
  user!: User;
}
