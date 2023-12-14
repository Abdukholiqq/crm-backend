import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "../utils/jwt";
interface CustomRequest extends Request {
  token?: JwtPayload; // user xususiyati JwtPayload turida bo'ladi
}

export const ChackToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const AuthHeader = req.headers["authorization"];
    const access_token: any =
      AuthHeader?.split(" ").length == 2
        ? AuthHeader.split(" ")[1]
        : AuthHeader;
    const chackToken: any = jwt.verify(access_token) as JwtPayload;
    req.token = chackToken;
    if (!chackToken) {
      return res.status(404).json({
        status: 404,
        message: "Token Required !!!",
      });
    }
    next();
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
