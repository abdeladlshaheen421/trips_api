import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import databaseConfig from "./config";

dotenv.config();
const ENV = process.env.ENV ?? "development";
const sequelize = new Sequelize({ ...Object(databaseConfig)[ENV] });

export default sequelize;
