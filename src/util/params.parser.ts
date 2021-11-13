import {Request} from "express";
import {UnnotarizedException} from "./exception/unnotarized.exception";

export function parseLimitOffset(request: Request) {
    const { page, limit } = request.query;

    const limitNumber = limit ? parseInt(<string>limit) : 20;
    const skip = (page ? parseInt(<string>page) : 0) * limitNumber

    return {
        skip: skip,
        limit: limitNumber
    }
}

export function getUserAccess(request: Request): string {
    const userAccess = request.query.userAccess;

    if (!userAccess) {
        throw new UnnotarizedException("Sem autorização.");
    }

    return <string> userAccess;
}