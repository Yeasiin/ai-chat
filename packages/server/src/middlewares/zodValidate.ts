import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodType } from "zod";

export const validate =
   (schema: ZodType) =>
   async (req: Request, res: Response, next: NextFunction) => {
      try {
         await schema.parseAsync(req.body);
         next();
      } catch (error: unknown) {
         // @ts-ignore
         const zodError = error.flatten().fieldErrors;
         // @ts-ignore
         const errors = error.errors.map((err) => ({
            ...err,
            path: err.path.filter((p: string) => p !== "body"), // Remove "body" from path array
         }));

         res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Validation Error",
            errors: errors,
         });
      }
   };
