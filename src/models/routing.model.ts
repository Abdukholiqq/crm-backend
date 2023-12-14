import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db_config";

class RoutingModels extends Model {}
RoutingModels.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    routing: { type: DataTypes.STRING, allowNull: false }, 
  },
  {
    sequelize,
    tableName: "routing",
    underscored: true,
  }
);
export default RoutingModels;
