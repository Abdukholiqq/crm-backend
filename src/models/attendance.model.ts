import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db_config";

class AttendanceModel extends Model {}
AttendanceModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },   
    day: { type: DataTypes.STRING, allowNull: false }, 
    groupId: { type: DataTypes.INTEGER },
    studentId:{type: DataTypes.INTEGER}
  },
  {
    sequelize,
    tableName: "attendances",
    underscored: true,
  }
);
export default AttendanceModel;
