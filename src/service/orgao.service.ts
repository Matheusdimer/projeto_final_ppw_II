import {FindConditions, getRepository} from "typeorm";
import {NotFoundException} from "../util/exception/not-found.exception";
import {Orgao} from "../model/orgao.model";

export default function createOrgaoService() {
    const repository = getRepository(Orgao);

    async function find(id: number) {
        const orgao = await repository.findOne(id);

        if (!orgao) {
            throw new NotFoundException(`Orgao com id ${id} não encontrada.`);
        }

        return orgao;
    }

    async function findAll(skip: number, take: number, codigo?: number) {
        const where: FindConditions<Orgao> = {};

        if (codigo) {
            where.codigo = codigo;
        }

        return await repository.find({ skip, take, where })
    }

    async function create(orgao: Orgao) {
        return await repository.save(orgao);
    }

    async function update(id: number, orgao: Orgao) {
        await find(id);
        orgao.id = id;
        return await repository.save(orgao);
    }

    async function remove(id: number) {
        const orgao = await find(id);

        const deleteResult = await repository.delete(orgao);

        if (deleteResult.affected === 0) {
            throw new Error("Erro ao excluir orgao.");
        }

        return orgao;
    }

    return {
        find,
        findAll,
        create,
        update,
        remove
    }
}