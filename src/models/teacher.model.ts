import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db_config";

class TeacherModel extends Model {}
TeacherModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false }, 
    routing: { type: DataTypes.STRING, allowNull: false },  
    phone: { type: DataTypes.STRING, allowNull: false }, 
    avatar: { type: DataTypes.STRING }
  },
  {
    sequelize,
    tableName: "teachers",
    underscored: true,
  }
);
export default TeacherModel;
