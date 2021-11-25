import {Router} from "express";
import authMiddleware from "../middleware/auth.middleware";
import createOrgaoController from "../controllers/orgao.controller";

const router = Router();
const controller = createOrgaoController();

router.get("/", authMiddleware, controller.findAll);

router.get("/:id", authMiddleware, controller.find);

router.post("/", authMiddleware, controller.create);

router.put("/:id", authMiddleware, controller.update);

router.delete("/:id", authMiddleware, controller.remove);

export default router;