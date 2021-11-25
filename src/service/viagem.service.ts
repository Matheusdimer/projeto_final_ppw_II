import {FindConditions, getRepository} from "typeorm";
import {Viagem} from "../model/viagem.model";
import {NotFoundException} from "../util/exception/not-found.exception";

export default function createViagemService() {
    const repository = getRepository(Viagem);

    async function find(id: number) {
        const viagem = await repository.findOne(id);

        if (!viagem) {
            throw new NotFoundException(`Viagem com id ${id} não encontrada.`);
        }

        return viagem;
    }

    async function findAll(skip: number, take: number, viajanteId?: number, orgaoId?: number) {
        const where: FindConditions<Viagem> = {};

        if (viajanteId) {
            where.viajante = { id: viajanteId }
        }

        if (orgaoId) {
            where.orgao = { id: orgaoId }
        }

        return await repository.find({ skip, take, where })
    }

    async function create(viagem: Viagem) {
        return await repository.save(viagem);
    }

    async function update(id: number, viagem: Viagem) {
        await find(id);
        viagem.id = id;
        return await repository.save(viagem);
    }

    async function remove(id: number) {
        const viagem = await find(id);

        const deleteResult = await repository.delete(viagem);

        if (deleteResult.affected === 0) {
            throw new Error("Erro ao excluir viagem.");
        }

        return viagem;
    }

    return {
        find,
        findAll,
        create,
        update,
        remove
    }
}