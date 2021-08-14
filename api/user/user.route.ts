import { Router, Request, Response, NextFunction } from "express";
import adminMiddleware from "../middleware/auth";
import passport from "passport";
import { userType } from "./user.schema";

const router: Router = Router();
router.post(
  "/api/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as userType;
    try {
      //  const result = await signUpClient(data);
      //  res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);
