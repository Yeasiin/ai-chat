export default class AppError extends Error {
   statusCode;
   status;
   isOperational;
   constructor(msg: string, statusCode: number) {
      super(msg);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "failed" : "error";
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
   }
}
