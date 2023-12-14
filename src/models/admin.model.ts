import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db_config";

class AdminModels extends Model {}
AdminModels.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "admins",
    underscored: true,
  }
);
export default AdminModels;
