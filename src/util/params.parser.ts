import {Request} from "express";

export function parseLimitOffset(request: Request) {
    const { page, limit } = request.query;

    const limitNumber = limit ? parseInt(<string>limit) : 20;
    const skip = (page ? parseInt(<string>page) : 0) * limitNumber

    return {
        skip: skip,
        limit: limitNumber
    }
}