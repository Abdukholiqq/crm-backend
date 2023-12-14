import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db_config";
import StudentModel from "./student.model";
import TeacherModel from "./teacher.model";

class GroupModel extends Model {}
GroupModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    group_name: { type: DataTypes.STRING, allowNull: false },
    routing: { type: DataTypes.STRING, allowNull: false },
    lesson_days: { type: DataTypes.STRING, allowNull: false },
    lesson_time: { type: DataTypes.STRING, allowNull: false },
    teacherId: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: "groups",
    underscored: true,
  }
);

GroupModel.hasMany(StudentModel, { foreignKey: "id" });
StudentModel.belongsTo(GroupModel);
TeacherModel.hasMany(GroupModel,{foreignKey: "id"})
GroupModel.belongsTo(TeacherModel);
export default GroupModel;
