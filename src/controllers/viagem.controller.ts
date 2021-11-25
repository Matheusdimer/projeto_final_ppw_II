import {Request, Response} from "express";
import {parseSkipLimit, tryParseNumber} from "../util/params.parser";
import createViagemService from "../service/viagem.service";
import {isNumber} from "util";

export default function createViagemController() {
    const service = createViagemService();

    async function findAll(req: Request, res: Response) {
        const { skip, limit } = parseSkipLimit(req);
        const { viajante, orgao } = req.params

        const viajanteId = tryParseNumber(viajante, "Identificador do viajante inválido.");
        const orgaoId = tryParseNumber(orgao, "Identificador do orgão inválido.");

        return res.json(await service.findAll(skip, limit, viajanteId, orgaoId));
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