import { Request, Response } from "express";
import { resolve } from "path"; 
import { JwtPayload } from "jsonwebtoken";
import StudentModel from "../models/student.model";
import GroupModel from "../models/group.model";
import { StudentData } from "../utils/types"; 

interface CustomRequest extends Request {
  token?: JwtPayload;
}

const AddStudent = async (req: CustomRequest, res: Response) => {
  try {
    const file: any = req.files?.file;
    const data: StudentData = req.body;
    let {group_name} = data
    if (!req.token?.isAdmin) {
      return res.status(400).json({
        status: 400,
        message: "Your is not Admin !!!",
      });
    }
    let { mv, name } = await file;
    const extFile = name.replace(".", "");
    const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
    if (!extPattern) throw new TypeError("Image format is not valid");
    name = Date.now() + "-" + name.replace(/\s/g, "");
    mv(resolve("src", "uploads", name));
    group_name = group_name.toLocaleUpperCase()
    let group = await GroupModel.findOne({where:{group_name}})

    const student = await StudentModel.create({
      ...data,
      group_name,
      groupId: group?.dataValues.id,
      avatar: name,
    });
    return res.status(201).json({
      status: 201,
      message: "Succsessfilly !!!",
      data: student,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
// Admin get all Student data
const GetAllStudent = async (req: Request, res: Response) => {
  try {
    const student = await StudentModel.findAll();
    if (!student) {
      return res.status(404).json({
        status: 404,
        message: "Student Not Found !!!",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "SuccessFully !!!",
      data: student,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
// Admin get selected Student data
const GetStudentById = async (req: Request, res: Response) => {
  try {
    const id = req.params?.id;
    const student = await StudentModel.findOne({ where: { id } });
    if (!student) {
      return res.status(404).json({
        status: 404,
        message: "Student Not Found !!!",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "SuccessFully !!!",
      data: student,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
// Admin update Student data
const UpdateStudent = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    const file: any = req.files?.file;
    const data: StudentData = req.body;
    let { username, phone, parent_name, parent_phone, routing, group_name } = data;
    const student = await StudentModel.findOne({ where: { id } });
    group_name = group_name.toLocaleUpperCase()
    let group = await GroupModel.findOne({where:{group_name}})
    if (!req.token?.isAdmin) {
        return res.status(404).json({
          status: 404,
          message: "Your Not Admin !!!",
        });
      }
    if (file) {
      var { mv, name } = await file;
      const extFile = name.replace(".", "");
      const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
      if (!extPattern) throw new TypeError("Image format is not valid");
      name = Date.now() + "-" + name.replace(/\s/g, "");
      mv(resolve("src", "uploads", name));
    }
    const updateStudent = await StudentModel.update(
      {
        username: username || student?.dataValues.username,
        phone: phone || student?.dataValues.phone,
        parent_name: parent_name || student?.dataValues.parent_name,
        parent_phone: parent_phone || student?.dataValues.parent_phone,
        routing: routing || student?.dataValues.routing,
        group_name: group_name || student?.dataValues.group_name,
        groupId: group?.dataValues.id || student?.dataValues.groupId,
        avatar: name || student?.dataValues.avatar,
      },
      { where: { id } }
    );
    return res.status(201).json({
      status: 201,
      message: "Successfully !!!",
      data: updateStudent,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
// Admin delete Student data
const DeleteStdent = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params?.id;
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not Admin !!!",
      });
    }
    const student = await StudentModel.findOne({ where: { id } });
    if (!student) {
      return res.status(404).json({
        status: 404,
        message: "Student Not Found !!!",
      });
    }
    const deletedStudent = await StudentModel.destroy({ where: { id } });
    return res.status(200).json({
      status: 200,
      message: "SuccessFully !!!",
      data: deletedStudent,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
export default {AddStudent,GetAllStudent, GetStudentById, UpdateStudent, DeleteStdent }