import express, { Request, Response, Express, NextFunction } from "express";

const app: Express = express();
const PORT: number = 3000;

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello World");
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
