import HttpException from "./HttpException";

export default class PaymentNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Payment with id ${id} not found`);
    }
}
