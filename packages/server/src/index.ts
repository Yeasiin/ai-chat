import { config } from "dotenv";
config();

import cors from "cors";
import morgan from "morgan";
import express, {
   type Request,
   type Response,
   type NextFunction,
} from "express";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";

const app = express();

app.use(
   cors({
      credentials: true,
      origin: "http://localhost:5173",
   })
);
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api", (req: Request, res: Response) => {
   res.json({
      message: "Yep! Working",
   });
});

const PORT = process.env.NODE_ENV || 5000;

// handle no router found
app.use((req: Request, res: Response, next: NextFunction) => {
   next(new AppError(`Can't find ${req.originalUrl} on server`, 400));
});
// handle error
app.use(globalErrorHandler);

app.listen(PORT, () => {
   console.log(`app listening on port http://localhost:${PORT}`);
});
