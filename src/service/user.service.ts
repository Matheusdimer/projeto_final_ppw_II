import {User} from "../model/user.model";
import {getRepository} from "typeorm";
import {compareSync, hashSync} from "bcrypt";
import {UnnotarizedException} from "../util/exception/unnotarized.exception";
import jwt from "jsonwebtoken";
import {NotFoundException} from "../util/exception/not-found.exception";
import {ValidationException} from "../util/exception/validation.exception";
import {ForbbidenException} from "../util/exception/forbbiden.exception";

const SECRET_KEY = process.env.ENCRYPT_KEY || "xavi";
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || "1d"

export default function createUserService() {
    const repository = getRepository(User);

    async function find(id: number) {
        return await repository.findOne({ id });
    }

    async function findByUsername(username: string) {
        return await repository.findOne({ username });
    }

    async function findAll(skip: number, take: number) {
        return await repository.find({ skip, take });
    }

    async function create(user: User) {
        const existenceUser = await findByUsername(user.username);

        if (existenceUser) {
            throw new ValidationException("Usuário já cadastrado.");
        }

        user.password = hashSync(user.password, 10);
        return await repository.save(user);
    }

    async function update(id: number, user: User, userAccess: string) {
        const existenceUser = await find(id);

        if (!existenceUser) {
            throw new NotFoundException(`Usuário id ${id} não encontrado.`);
        }

        const existenceNewUser = await findByUsername(user.username);

        if (existenceNewUser) {
            throw new ValidationException("Usuário já cadastrado.");
        }

        if (userAccess !== existenceUser.username) {
            throw new ForbbidenException("Não é permitido alterar esse usuário.");
        }

        return await repository.save(user);
    }

    async function remove(id: number, userAccess: string) {
        const existenceUser = await find(id);

        if (!existenceUser) {
            throw new NotFoundException(`Usuário id ${id} não encontrado.`);
        }

        if (userAccess !== existenceUser.username) {
            throw new ForbbidenException("Não é permitido remover esse usuário.");
        }

        const deleteResult = await repository.delete(existenceUser);

        if (deleteResult.affected === 0) {
            throw new Error("Erro ao remover usuário.");
        }

        return existenceUser;
    }

    function generateToken(user: User) {
        return jwt.sign({ sub: user.username }, SECRET_KEY, {
            expiresIn: TOKEN_EXPIRATION
        });
    }

    function validateToken(token: string) {
        try {
            return jwt.verify(token, SECRET_KEY);
        } catch (e) {
            return null;
        }
    }

    async function login(user: User): Promise<string> {
        if (!user) {
            throw new UnnotarizedException("Usuário não autorizado.");
        }

        const savedUser = await findByUsername(user.username);

        if (!savedUser) {
            throw new NotFoundException("Usuário não encontrado.");
        }

        const verified = compareSync(user.password, savedUser.password);

        if (!verified) {
            throw new UnnotarizedException("Usuário não autorizado.");
        }

        return generateToken(user);
    }

    return {
        find,
        findAll,
        create,
        login,
        update,
        remove,
        validateToken
    };
}