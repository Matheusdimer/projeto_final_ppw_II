import {Router} from "express";
import authMiddleware from "../middleware/auth.middleware";
import PessoaController from "../controllers/pessoa.controller";

const router = Router();
const controller = new PessoaController();

router.get("/", authMiddleware, controller.findAll);

router.get("/:id", authMiddleware, controller.find);

router.post("/", authMiddleware, controller.create);

router.put("/:id", authMiddleware, controller.update);

router.delete("/:id", authMiddleware, controller.remove);

export default router;