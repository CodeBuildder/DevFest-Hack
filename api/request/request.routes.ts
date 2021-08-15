import { Router, Request, Response, NextFunction } from "express";
import adminMiddleware from "../middleware/auth";
import { requestType } from "./request.schema";
import { sendRequest, findRequest } from "./request.db";
import { userDB } from "../user/user.schema";

const router: Router = Router();

router.post(
  "/api/worker/request",
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = req.user as userDB;
      const data = req.body as requestType;
      const result = await sendRequest(data, user);
      res.json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
router.get(
  "/api/worker/request/:workerId",
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const workerId = req.params.workerId;
      const result = await findRequest(workerId);
      res.json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);