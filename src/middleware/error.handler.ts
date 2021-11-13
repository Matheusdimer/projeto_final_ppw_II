import {NextFunction, Request, Response} from "express";
import {HttpException} from "../util/exception/http.exception";

export function httpErrorHandler(err: HttpException, req: Request, res: Response, next: NextFunction) {
    res.status(err.status).json({
        status: err.status,
        message: err.message
    });
}

export function defaultErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500).json({
       status: 500,
       message: "Ocorreu um erro interno."
    });
}