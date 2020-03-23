export class Message extends Error {
    public message: string;
    public status = 200;

    constructor(message?: string) {
        super();
        this.message = message;
    }

    public withStatus(status: number): Message {
        this.status = status;
        return this;
    }
}
