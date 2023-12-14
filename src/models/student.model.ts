import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db_config";

class StudentModel extends Model {}
StudentModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING, allowNull: false },
    parent_name: { type: DataTypes.STRING, allowNull: false },
    parent_phone: { type: DataTypes.STRING, allowNull: false },
    routing: { type: DataTypes.STRING, allowNull: false },
    groupId: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: "students",
    underscored: true,
  }
);
export default StudentModel;
