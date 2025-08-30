import { type NextFunction, type Request, type Response } from "express";
import AppError from "../utils/appError";

function sendErrorOnDevelopment(err: AppError, req: Request, res: Response) {
   res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
   });
}

function sendErrorOnProduction(err: AppError, req: Request, res: Response) {
   if (err.isOperational) {
      res.status(err.statusCode).json({
         status: err.status,
         message: err.message,
      });
   } else {
      // unknown error
      console.log("unknown error ❌", err);
      res.status(500).json({
         status: "error",
         message: "Something went wrong",
      });
   }
}

export default function globalErrorHandler(
   err: AppError,
   req: Request,
   res: Response,
   next: NextFunction
) {
   err.statusCode = err.statusCode || 500;
   err.status = err.status || "error";

   if (process.env.NODE_ENV === "development") {
      sendErrorOnDevelopment(err, req, res);
   } else if (process.env.NODE_ENV === "production") {
      const error = { ...err };
      // message property lost during the destruction
      // so re assigning again
      error.message = err.message;
      sendErrorOnProduction(error, req, res);
   } else {
      res.json({ status: "failed", message: "NODE_ENV is not defined" });
   }
}
