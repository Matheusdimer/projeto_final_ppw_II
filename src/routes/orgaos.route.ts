import {Router} from "express";
import authMiddleware from "../middleware/auth.middleware";
import OrgaoController from "../controllers/orgao.controller";

const router = Router();
const controller = new OrgaoController();

router.get("/", authMiddleware, controller.findAll);

router.get("/:id", authMiddleware, controller.find);

router.post("/", authMiddleware, controller.create);

router.put("/:id", authMiddleware, controller.update);

router.delete("/:id", authMiddleware, controller.remove);

export default router;