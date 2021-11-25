import {Router} from "express";
import authMiddleware from "../middleware/auth.middleware";
import createViagemController from "../controllers/viagem.controller";

const router = Router();
const controller = createViagemController();

router.get("/", authMiddleware, controller.findAll);

router.get("/:id", authMiddleware, controller.find);

router.post("/", authMiddleware, controller.create);

router.put("/:id", authMiddleware, controller.update);

router.delete("/:id", authMiddleware, controller.remove);

export default router;