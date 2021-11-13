import {Router} from "express";
import createUserController from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();
const controller = createUserController();

router.get("/", authMiddleware, controller.findAll);

router.get("/:id", authMiddleware, controller.find);

router.post("/", controller.create);

router.put("/:id", authMiddleware, controller.update);

router.delete("/:id", authMiddleware, controller.remove);

export default router;