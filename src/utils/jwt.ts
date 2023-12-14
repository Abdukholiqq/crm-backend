import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY ||  "crm-secret";

export default {
  sign: (payload: any) => jwt.sign(payload, SECRET_KEY),
  verify: (token:any) => jwt.verify(token, SECRET_KEY),
}; 
