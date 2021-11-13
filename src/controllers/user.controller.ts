import createUserService from "../service/user.service";
import {Request, Response} from "express";
import {parseLimitOffset} from "../util/params.parser";

export default function createUserController() {
    const service = createUserService();

    async function findAll(req: Request, res: Response) {
        const { skip, limit } = parseLimitOffset(req);
        return res.json(await service.findAll(skip, limit));
    }

    async function create(req: Request, res: Response) {
        return res.json(await service.create(req.body));
    }

    return {
        findAll,
        create
    }
}