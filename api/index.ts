import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import connectDB from "./db/db.connect";
import { HttpError } from "http-errors";
connectDB();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "thisissparta",
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
// app.use(errorHandler);
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(passport.initialize());
app.use(passport.session());

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(error.status).json({ message: error.message });
  }
});
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Resource not found" });
});
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
