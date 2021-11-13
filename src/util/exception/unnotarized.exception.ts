export class UnnotarizedException extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.status = 401
    }
}