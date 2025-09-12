import {
   type Request,
   type Response,
   type NextFunction,
   type RequestHandler,
} from "express";

export const asyncHandler = <
   P = {}, // params
   ResBody = any,
   ReqBody = any,
   ReqQuery = any,
>(
   fn: (
      req: Request<P, ResBody, ReqBody, ReqQuery>,
      res: Response<ResBody>,
      next: NextFunction
   ) => Promise<any>
) => {
   return (
      req: Request<P, ResBody, ReqBody, ReqQuery>,
      res: Response<ResBody>,
      next: NextFunction
   ) => {
      Promise.resolve(fn(req, res, next)).catch(next);
   };
};
