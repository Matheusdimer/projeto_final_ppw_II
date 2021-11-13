import createUserService from "../service/user.service";
import {Request, Response} from "express";
import {getUserAccess, parseLimitOffset} from "../util/params.parser";

export default function createUserController() {
    const service = createUserService();

    async function findAll(req: Request, res: Response) {
        const { skip, limit } = parseLimitOffset(req);
        return res.json(await service.findAll(skip, limit));
    }

    async function find(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        return res.json(await service.find(id));
    }

    async function create(req: Request, res: Response) {
        return res.json(await service.create(req.body));
    }

    async function update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        return res.json(await service.update(id, req.body, getUserAccess(req)));
    }

    async function remove(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        return res.json(await service.remove(id,getUserAccess(req)));
    }

    return {
        find,
        findAll,
        create,
        update,
        remove
    }
}