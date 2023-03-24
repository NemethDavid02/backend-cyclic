import { ObjectId } from "mongoose";

import HttpException from "./HttpException";

export default class OrderWithThatIdAlreadyExistsException extends HttpException {
    constructor(_id: ObjectId) {
        super(400, `Order with Id ${_id} already exists`);
    }
}
