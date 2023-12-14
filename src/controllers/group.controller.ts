import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import GroupModel from "../models/group.model";
import RoutingModels from "../models/routing.model";
import { GroupData } from "../utils/types";

interface CustomRequest extends Request {
  token?: JwtPayload;
}

const AddGroup = async (req: CustomRequest, res: Response) => {
  try {
    const data: GroupData = req.body;
    let { group_name } = data;
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not is Admin !!!",
      });
    }
    group_name = group_name.toLocaleUpperCase();
    const group = await GroupModel.findOne({ where: { group_name } });
    if (!group) {
      return res.status(404).json({
        status: 404,
        message: "This is Group already exists !!!",
      });
    }
    const newGroup = await GroupModel.create({ ...data, group_name });
    return res.status(201).json({
      status: 201,
      message: "SuccessFully !!!",
      data: newGroup,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const GetAllGroup = async (req: Request, res: Response) => {
  try {
    const group = await GroupModel.findAll({
      include: [{ all: true }],
    });
    return res.status(200).json({
      status: 200,
      message: "SuccessFully !!!",
      data: group,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const GetGroupById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const group = await GroupModel.findOne({
      where: { id },
      include: [{ all: true }],
    });
    return res.status(200).json({
      status: 200,
      message: "SuccessFully !!!",
      data: group,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const UpdadeGroup = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    const data: GroupData = req.body;
    let { group_name, routing, lesson_days, lesson_time, teacherId } = data;
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not is Admin !!!",
      });
    }
    group_name = group_name.toLocaleUpperCase();
    const chackRouting = await RoutingModels.findOne({ where: { routing } });
    if (!chackRouting) {
      return res.status(404).json({
        status: 404,
        message: "Routing Not Found",
      });
    }
    const group = await GroupModel.findOne({ where: { group_name } });
    if (!group) {
      return res.status(404).json({
        status: 404,
        message: "Group Not Found",
      });
    }
    const updateGroup = await GroupModel.update(
      {
        group_name: group_name || group.dataValues.group_name,
        routing: routing || group.dataValues.routing,
        lesson_days: lesson_days || group.dataValues.lesson_days,
        lesson_time: lesson_time || group.dataValues.lesson_time,
        teacherId: teacherId || group.dataValues.teacherId,
      },
      { where: { id } }
    );
    return res.status(201).json({
      status: 201,
      message: "SuccessFully !!!",
      data: updateGroup,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const DeleteGroup = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const group = await GroupModel.destroy({ where: { id } });
    return res.status(200).json({
      status: 201,
      message: "SuccessFully !!!",
      data: group,
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
  AddGroup,
  GetAllGroup,
  GetGroupById,
  UpdadeGroup,
  DeleteGroup,
};
