import HttpException from "./HttpException";

export default class OrderNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Order with id ${id} not found`);
    }
}
