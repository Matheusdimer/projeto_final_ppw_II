import {Router} from "express";
import createUserService from "../service/user.service";

const router = Router();
const userService = createUserService();

router.post("/", async (req, res) => {
    const token = await userService.login(req.body);
    res.json({ token });
})

export default router;