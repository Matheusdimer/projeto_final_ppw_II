import {Request, Response} from "express";
import {parseSkipLimit} from "../util/params.parser";
import createPessoaService from "../service/pessoa.service";

export default function createPessoaController() {
    const service = createPessoaService();

    async function findAll(req: Request, res: Response) {
        const { skip, limit } = parseSkipLimit(req);
        return res.json(await service.findAll(skip, limit, <string>req.query.cpf));
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
        return res.json(await service.update(id, req.body));
    }

    async function remove(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        return res.json(await service.remove(id));
    }

    return {
        find,
        findAll,
        create,
        update,
        remove
    }
}