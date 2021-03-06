import {NextFunction, Request, Response} from "express";
import createUserService from "../service/user.service";
import {ForbbidenException} from "../util/exception/forbbiden.exception";
import {UnnotarizedException} from "../util/exception/unnotarized.exception";

const userService = createUserService();

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header("authorization");

    if (!token) {
        throw new ForbbidenException("Token não informado.");
    }

    if (!token.startsWith("Bearer ")) {
        throw new ForbbidenException("Token mal formado.");
    }

    const access = userService.validateToken(token.substr(7));

    if (!access || !access.sub) {
        throw new UnnotarizedException("Token inválido.");
    }

    req.query.userAccess = <string> access.sub;
    next();
}