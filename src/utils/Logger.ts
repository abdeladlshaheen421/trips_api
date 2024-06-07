import winston from "winston";
import "winston-daily-rotate-file";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const { LOGS_DIR } = process.env;

const logFormat = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:MM:SS" }),
  winston.format.simple(),
  winston.format.splat(),
  winston.format.json(),
  winston.format.prettyPrint()
);

export const logger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "error-%DATE%.log",
      level: "error",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "60d",
      dirname: LOGS_DIR,
    }),
    new winston.transports.DailyRotateFile({
      filename: "debug-%DATE%.log",
      level: "debug",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "60d",
      dirname: LOGS_DIR,
    }),
  ],
});

interface Log {
  url: string;
  method: string;
  originalUrl: string;
  clientIp?: string;
  body: Object;
  params: Object;
  query: Object;
  user?: Object;
}

export function LogsDataMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const log: Log = {
    url: req.url,
    method: req.method,
    originalUrl: req.originalUrl,
    params: req.params,
    query: req.query,
    body: req.body,
    clientIp: req.ip,
  };
  logger.log("info", log);
  next();
}
