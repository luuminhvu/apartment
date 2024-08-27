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
  tableName: "feedback",
  timestamps: true,
})
export class Feedback extends Model<Feedback> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @Column(DataType.TEXT)
  feedbackContent!: string;

  @Column(DataType.STRING)
  feedbackType!: "feedback" | "complaint" | "suggestion";

  @Column(DataType.DATE)
  feedbackDate!: Date;

  @Column(DataType.TEXT)
  responseContent?: string;

  @Column(DataType.DATE)
  responseDate?: Date;

  @Column(DataType.ENUM("pending", "responded", "resolved"))
  status!: "pending" | "responded" | "resolved";

  @BelongsTo(() => User)
  user!: User;
}
