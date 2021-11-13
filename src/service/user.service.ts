import {User} from "../model/user.model";
import {getRepository} from "typeorm";
import {compareSync, hashSync} from "bcrypt";
import {UnnotarizedException} from "../util/exception/unnotarized.exception";

export default function createUserService() {
    const repository = getRepository(User);

    async function find(id: number) {
        return await repository.findOne({ id });
    }

    async function findByUsername(username: string) {
        return await repository.findOne({ username });
    }

    async function findAll(skip: number, limit: number) {
        return await repository.find({ skip, take: limit });
    }

    async function create(user: User) {
        user.password = hashSync(user.password, 10);
        return await repository.save(user);
    }

    function generateToken(user: User) {
        return "";
    }

    async function login(user: User): Promise<string> {
        const savedUser = await findByUsername(user.username);

        if (!savedUser) {
            throw new UnnotarizedException("Usuário não autorizado.");
        }

        const verified = compareSync(user.password, savedUser.password);

        if (!verified) {
            throw new UnnotarizedException("Usuário não autorizado.");
        }

        return generateToken(user);
    }

    return {
        findAll,
        create
    };
}