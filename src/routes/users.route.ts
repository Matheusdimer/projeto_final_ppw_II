import {Router} from "express";
import createUserController from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();
const controller = createUserController();

router.get("/", authMiddleware, controller.findAll);

router.post("/", controller.create);

export default router;