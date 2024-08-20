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
import { Rental } from "./Rental";

@Table({
  tableName: "payments",
  timestamps: true,
})
export class Payment extends Model<Payment> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Rental)
  @Column(DataType.INTEGER)
  rentalId!: number;

  @Column(DataType.DECIMAL(10, 2))
  amount!: number;

  @Column(DataType.DATE)
  paymentDate!: Date;

  @Column(DataType.ENUM("bank_transfer", "credit_card", "cash", "e_wallet"))
  paymentMethod!: "bank_transfer" | "credit_card" | "cash" | "e_wallet";

  @Column(DataType.ENUM("completed", "pending", "failed"))
  status!: "completed" | "pending" | "failed";

  @BelongsTo(() => Rental)
  rental!: Rental;
}
