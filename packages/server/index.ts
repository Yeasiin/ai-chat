import express, { type Request, type Response } from "express";

const app = express();

app.get("/api", (req: Request, res: Response) => {
   res.json({
      message: "Yep! Working",
   });
});

const PORT = 5000;

app.listen(PORT, () => {
   console.log(`app listening on port http://localhost:${PORT}`);
});
