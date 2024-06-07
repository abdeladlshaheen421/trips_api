import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import { logger, LogsDataMiddleware } from "./utils/Logger";
import sequelize from "./config/sequelize";

dotenv.config();
const { SERVER_PORT, ENV, FRONTEND_URL } = process.env;
const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(LogsDataMiddleware);

app.listen(SERVER_PORT || 3000, (): void => {
  sequelize
    .authenticate()
    .then(() => {
      console.log(
        `||=============================================||
       \n||         Server is running on port ${SERVER_PORT}      ||
       \n||=============================================||`
      );
    })
    .catch((error) => console.log("DataBase connection Failed"));
});

// ===========Routes===========
app.get(
  "/",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    return res.status(200).json({
      message: "welcome to trips api",
    });
  }
);

//=============================

// Error handler middleware
app.use(
  (error: Error, req: Request, res: Response, next: NextFunction): Response => {
    logger.log("error", { error });
    if (ENV == "development")
      return res.status(500).json({ message: error.message });
    else {
      return res.status(500).json({ message: "Something Went Wrong" });
    }
  }
);

// notFound endpoint middleware
app.use((req: Request, res: Response, next: NextFunction): Response => {
  return res.status(404).json({ message: "Not Found" });
});
