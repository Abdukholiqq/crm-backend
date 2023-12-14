import { Request, Response } from "express";
import { resolve } from "path";
import { JwtPayload } from "jsonwebtoken";
import RoutingModels from "../models/routing.model";

interface CustomRequest extends Request {
  token?: JwtPayload;
}

const AddRouting = async (req: CustomRequest, res: Response) => {
  try {
    const { routing } = req.body;
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not Admin !!!",
      });
    }
    const chackRouting = await RoutingModels.findOne({ where: { routing } });
    if (!chackRouting) {
      return res.status(404).json({
        status: 404,
        message: "This is Rouring already exist !!!",
      });
    }
    const newRouting = await RoutingModels.create({ routing });
    return res.status(201).json({
      status: 201,
      message: "SuccessFully !!!",
      data: newRouting,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const GetRouting = async (req: Request, res: Response) => {
  try {
    const routing = await RoutingModels.findAll({
      include: [{ all: true }],
    });
    return res.status(200).json({
      status: 200,
      message: "SuccessFully !!!",
      data: routing,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const GetRoutingById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const routing = await RoutingModels.findOne({
      where: { id },
      include: [{ all: true }],
    });
    return res.status(200).json({
      status: 200,
      message: "SuccessFully !!!",
      data: routing,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const UpdateRouting = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    const { routing } = req.body;
    const chackRouting = await RoutingModels.findOne({ where: { id } });
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not is Admin",
      });
    }
    if (!chackRouting) {
      return res.status(404).json({
        status: 404,
        message: "Routing Not Found",
      });
    }
    const updateRouting = await RoutingModels.update(
      { routing },
      { where: { id } }
    );
    return res.status(200).json({
      status: 200,
      message: "SuccessFully !!!",
      data: updateRouting,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const DeleteRouting = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    const routing = await RoutingModels.findOne({ where: { id } });
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not is Admin",
      });
    }
    if (!routing) {
      return res.status(404).json({
        status: 404,
        message: "Routing Not Found",
      });
    }
    const deleteRouting = await RoutingModels.destroy({ where: { id } });
    return res.status(201).json({
      status: 201,
      message: "SuccessFully !!!",
      data: deleteRouting,
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
  AddRouting,
  GetRouting,
  GetRoutingById,
  UpdateRouting,
  DeleteRouting,
};
