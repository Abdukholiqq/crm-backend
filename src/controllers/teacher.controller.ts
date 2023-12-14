import { Request, Response } from "express";
import { resolve } from "path";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import TeacherModel from "../models/teacher.model";
import { AddTeacherData, TeacherLogin } from "../utils/types";
import jwt from "../utils/jwt";

interface CustomRequest extends Request {
  token?: JwtPayload;
}
// For Admin panel
// Admin create new Teacher
const AddTeacher = async (req: CustomRequest, res: Response) => {
  try {
    const file: any = req.files?.file;
    const data: AddTeacherData = req.body;
    let { username, phone_number, routing, password } = data;
    if (!req.token?.isAdmin) {
      return res.status(400).json({
        status: 400,
        message: "Your is not Admin !!!",
      });
    }
    const chackTeacher = await TeacherModel.findOne({
      where: { username, routing },
    });
    if (chackTeacher) {
      return res.status(400).json({
        status: 400,
        message: "This is Teacher already exists !",
      });
    }
    password = bcrypt.hashSync(password, 10);
    let { mv, name } = await file;
    const extFile = name.replace(".", "");
    const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
    if (!extPattern) throw new TypeError("Image format is not valid");
    name = Date.now() + "-" + name.replace(/\s/g, "");
    mv(resolve("src", "uploads", name));

    const teacher = await TeacherModel.create({
      username,
      phone_number,
      password,
      avatar: name,
    });
    return res.status(201).json({
      status: 201,
      message: "Succsessfilly !!!",
      data: teacher,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
// Admin get all Teacher data
const GetAllTeacher = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not Admin !!!",
      });
    }
    const teacher = await TeacherModel.findAll();
    if (!teacher) {
      return res.status(404).json({
        status: 404,
        message: "Teacher Not Found !!!",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "SuccessFully !!!",
      data: teacher,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
// Admin get selected Teacher data
const GetTeacherById = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params?.id;
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not Admin !!!",
      });
    }
    const teacher = await TeacherModel.findOne({ where: { id } });
    if (!teacher) {
      return res.status(404).json({
        status: 404,
        message: "Teacher Not Found !!!",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "SuccessFully !!!",
      data: teacher,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
// Admin update Teacher data
const UpdateTeacherAdmin = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    const file: any = req.files?.file;
    const data: AddTeacherData = req.body;
    let { username, phone_number, password } = data;
    const teacher = await TeacherModel.findOne({ where: { id } });

    if (password.length < 8) {
      console.log("Not only 8 symbol");
      return new Error("Not only 8 symbol");
    }
    const isTrue = await bcrypt.compare(password, teacher?.dataValues.password);
    if (!isTrue) {
      return res.status(402).json({
        status: 402,
        message: "Invalid Usename or Password",
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
    const updateTeacher = await TeacherModel.update(
      {
        username: username || teacher?.dataValues.username,
        phone_number: phone_number || teacher?.dataValues.phone_number,
        avatar: name || teacher?.dataValues.avatar,
      },
      { where: { id } }
    );
    return res.status(201).json({
      status: 201,
      message: "Successfully !!!",
      data: updateTeacher,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
// Admin delete Teacher data
const DeleteTeacher = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params?.id;
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not Admin !!!",
      });
    }
    const teacher = await TeacherModel.findOne({ where: { id } });
    if (!teacher) {
      return res.status(404).json({
        status: 404,
        message: "Teacher Not Found !!!",
      });
    }
    const deletedTeacher = await TeacherModel.destroy({ where: { id } });
    return res.status(200).json({
      status: 200,
      message: "SuccessFully !!!",
      data: deletedTeacher,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// for Teacher
// Teacher Login
const Login = async (req: Request, res: Response) => {
  const data: TeacherLogin = req.body;
  const { username, password } = data;
  if (password.length < 8) {
    console.log("Not only 8 symbol");
    return new Error("Not only 8 symbol");
  }
  const chackTeacher = await TeacherModel.findOne({ where: { username } });
  if (!chackTeacher) {
    return res.status(404).json({
      status: 404,
      message: "Teacher Not Found!",
    });
  }
  const isTrue = await bcrypt.compare(
    password,
    chackTeacher?.dataValues.password
  );
  if (!isTrue) {
    return res.status(402).json({
      status: 402,
      message: "Invalid Usename or Password",
    });
  }
  const TOKEN = jwt.sign({ username, id: chackTeacher.dataValues.id });
  return res.status(201).json({
    status: 201,
    message: "SuccessFully !!!",
    data: chackTeacher,
    access_token: TOKEN,
  });
};
// Teacher get data
const GetTeacher = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.token?.id;
    if (req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not Teacher !!!",
      });
    }
    const teacher = await TeacherModel.findOne({ where: { id } });
    if (!teacher) {
      return res.status(404).json({
        status: 404,
        message: "Teacher Not Found !!!",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "SuccessFully !!!",
      data: teacher,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
// Teacher update data
const UpdateTeacher = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.token?.id;
    const file: any = req.files?.file;
    const data: AddTeacherData = req.body;
    let { username, phone_number, password } = data;
    const teacher = await TeacherModel.findOne({ where: { id } });

    if (password.length < 8) {
      console.log("Not only 8 symbol");
      return new Error("Not only 8 symbol");
    }
    const isTrue = await bcrypt.compare(password, teacher?.dataValues.password);
    if (!isTrue) {
      return res.status(402).json({
        status: 402,
        message: "This is admin exists",
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
    const updateTeacher = await TeacherModel.update(
      {
        username: username || teacher?.dataValues.username,
        phone_number: phone_number || teacher?.dataValues.phone_number,
        avatar: name || teacher?.dataValues.avatar,
      },
      { where: { id } }
    );
    return res.status(201).json({
      status: 201,
      message: "Successfully !!!",
      data: updateTeacher,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export default {
  AddTeacher,
  GetAllTeacher,
  GetTeacherById,
  UpdateTeacherAdmin,
  DeleteTeacher,
  Login,
  GetTeacher,
  UpdateTeacher,
};
