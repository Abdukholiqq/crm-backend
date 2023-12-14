import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import PaymentModel from "../models/payment.model";
import { PaymentData } from "../utils/types";

interface CustomRequest extends Request {
  token?: JwtPayload;
}

const AddPayment = async (req: CustomRequest, res: Response) => {
  try {
    const data: PaymentData = req.body;
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not is Admin",
      });
    }
    const payment = await PaymentModel.create({ ...data });
    return res.status(201).json({
      status: 201,
      message: "SuccessFully !!!",
      data: payment,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const GetAllPayment = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not is Admin",
      });
    }
    const payment = await PaymentModel.findAll({
      include: [{ all: true }],
    });
    return res.status(200).json({
      status: 200,
      message: "SuccessFully !!!",
      data: payment,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const GetPaymentById = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not is Admin",
      });
    }
    const payment = await PaymentModel.findOne({
      where: { id },
      include: [{ all: true }],
    });
    return res.status(200).json({
      status: 200,
      message: "SuccessFully !!!",
      data: payment,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const UpdatePayment = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    const data: PaymentData = req.body;
    let {
      phone,
      routing,
      mounth,
      payment_price,
      status,
      groupId,
      teacherId,
      studentId,
    } = data;
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not is Admin",
      });
    }
    const payment = await PaymentModel.findOne({ where: { id } });
    if (!payment) {
      return res.status(404).json({
        status: 404,
        message: "Payment Not Found",
      });
    }
    const updatePayment = await PaymentModel.update(
      {
        phone: phone || payment.dataValues?.phone,
        routing: routing || payment.dataValues?.routing,
        mounth: mounth || payment.dataValues?.mounth,
        payment_price: payment_price || payment.dataValues?.payment_price,
        status: status || payment.dataValues?.status,
        groupId: groupId || payment.dataValues?.groupId,
        teacherId: teacherId || payment.dataValues?.teacherId,
        studentId: studentId || payment.dataValues?.studentId,
      },
      { where: { id } }
    );
    return res.status(201).json({
      status: 201,
      message: "SuccessFully !!!",
      data: updatePayment,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
const DeletePayment = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not is Admin",
      });
    }
    const payment = await PaymentModel.findOne({ where: { id } });
    if (!payment) {
      return res.status(404).json({
        status: 404,
        message: "Payment Not Found",
      });
    }
    const deletePayment = await PaymentModel.destroy({ where: { id } });
    return res.status(201).json({
      status: 201,
      message: "SuccessFully !!!",
      data: deletePayment,
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
  AddPayment,
  GetAllPayment,
  GetPaymentById,
  UpdatePayment,
  DeletePayment,
};
