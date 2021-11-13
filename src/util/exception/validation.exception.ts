export class ValidationException extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.status = 422
    }
}