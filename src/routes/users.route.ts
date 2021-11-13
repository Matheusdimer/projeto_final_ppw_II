import {Router} from "express";
import createUserController from "../controllers/user.controller";

const router = Router();
const controller = createUserController();

router.get("/", controller.findAll);

router.post("/", controller.create);

export default router;