import {FindConditions, getRepository} from "typeorm";
import {NotFoundException} from "../util/exception/not-found.exception";
import {Pessoa} from "../model/pessoa.model";

export default function createPessoaService() {
    const repository = getRepository(Pessoa);

    async function find(id: number) {
        const pessoa = await repository.findOne(id);

        if (!pessoa) {
            throw new NotFoundException(`Pessoa com id ${id} não encontrada.`);
        }

        return pessoa;
    }

    async function findAll(skip: number, take: number, cpf?: string) {
        const where: FindConditions<Pessoa> = {};

        if (cpf) {
            where.cpf = cpf
        }

        return await repository.find({ skip, take, where })
    }

    async function create(pessoa: Pessoa) {
        return await repository.save(pessoa);
    }

    async function update(id: number, pessoa: Pessoa) {
        await find(id);
        pessoa.id = id;
        return await repository.save(pessoa);
    }

    async function remove(id: number) {
        const pessoa = await find(id);

        const deleteResult = await repository.delete(pessoa);

        if (deleteResult.affected === 0) {
            throw new Error("Erro ao excluir pessoa.");
        }

        return pessoa;
    }

    return {
        find,
        findAll,
        create,
        update,
        remove
    }
}