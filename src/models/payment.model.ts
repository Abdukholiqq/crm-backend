import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db_config";

class PaymentModel extends Model {}
PaymentModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }, 
    phone: { type: DataTypes.STRING, allowNull: false }, 
    routing: { type: DataTypes.STRING, allowNull: false },
    mounth: {type: DataTypes.STRING, allowNull:false},
    payment_price: {type:DataTypes.INTEGER, allowNull:false},
    status:{type:DataTypes.BOOLEAN, defaultValue: false},
    groupId: { type: DataTypes.INTEGER },
    teacherId:{type: DataTypes.INTEGER},
    studentId:{type: DataTypes.INTEGER}
  },
  {
    sequelize,
    tableName: "payments",
    underscored: true,
  }
);
export default PaymentModel;
