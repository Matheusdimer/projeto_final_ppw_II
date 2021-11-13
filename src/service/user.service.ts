import {User} from "../model/user.model";
import {getRepository} from "typeorm";

export default function createUserService() {
    const repository = getRepository(User)

    async function findAll(skip: number, limit: number) {
        return await repository.find({ skip, take: limit });
    }

    async function create(user: User) {
        return await repository.save(user);
    }

    return {
        findAll,
        create
    };
}