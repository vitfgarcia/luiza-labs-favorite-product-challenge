export class Message {
    public message: string;
    public status = 200;

    constructor(message?: string) {
        this.message = message;
    }

    public withStatus(status: number): Message {
        this.status = status;
        return this;
    }
}
