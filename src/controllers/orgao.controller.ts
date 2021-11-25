import {Request, Response} from "express";
import {parseSkipLimit, tryParseNumber} from "../util/params.parser";
import createOrgaoService from "../service/orgao.service";

export default function createOrgaoController() {
    const service = createOrgaoService();

    async function findAll(req: Request, res: Response) {
        const { skip, limit } = parseSkipLimit(req);

        const orgaoId = tryParseNumber(req.query.orgao, "Código do órgão inválido.");

        return res.json(await service.findAll(skip, limit, orgaoId));
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