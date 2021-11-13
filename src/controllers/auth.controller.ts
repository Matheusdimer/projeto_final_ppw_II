import createUserService from "../service/user.service";
import {Request, Response} from "express";

const userService = createUserService();

export async function authController (req: Request, res: Response) {
    const token = await userService.login(req.body);

    res.json({ token });
}