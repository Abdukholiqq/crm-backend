 import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
  logging: false
});

( async ()=>{
    try {
        await sequelize.authenticate(),
        await sequelize.sync({alter: true})
        console.log("db connection");
    } catch (error) {
        console.log("db error, ", error);     
    }
})()