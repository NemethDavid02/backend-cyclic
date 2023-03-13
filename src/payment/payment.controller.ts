import { NextFunction, Request, Response, Router } from "express";
import { Types } from "mongoose";

import HttpException from "../exceptions/HttpException";
import IdNotValidException from "../exceptions/IdNotValidException";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import IController from "../interfaces/controller.interface";
// import IRequestWithUser from "../interfaces/requestWithUser.interface";
import authMiddleware from "../middleware/auth.middleware";
import roleCheckMiddleware from "../middleware/roleCheckMiddleware";
import validationMiddleware from "../middleware/validation.middleware";
// import postModel from "../post/post.model";
import CreatePaymentDto from "./payment.dto";
import IPayment from "./payment.interface";
import paymentModel from "./payment.model";

export default class PaymentController implements IController {
    public path = "/payments";
    public router = Router();
    private payment = paymentModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, authMiddleware, this.getPaymentById);
        this.router.get(this.path, this.getAllPayments);
        this.router.patch(
            `${this.path}/:id`,
            [authMiddleware, roleCheckMiddleware(["admin"]), validationMiddleware(CreatePaymentDto, true)],
            this.modifyPayment,
        );
        this.router.delete(`${this.path}/:id`, [authMiddleware, roleCheckMiddleware(["admin"])], this.deletePayment);
    }

    private getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.payment.find().then(payments => {
                res.send(payments);
            });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                // const userQuery = this.user.findById(id);
                // if (request.query.withPosts === "true") {
                //     userQuery.populate("posts").exec();
                // }
                const payment = await this.payment.findById(id);
                if (payment) {
                    res.send(payment);
                } else {
                    next(new UserNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private modifyPayment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const paymentData: IPayment = req.body;
                const payment = await this.payment.findByIdAndUpdate(id, paymentData, { new: true });
                if (payment) {
                    res.send(payment);
                } else {
                    next(new UserNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private deletePayment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const successResponse = await this.payment.findByIdAndDelete(id);
                if (successResponse) {
                    res.sendStatus(200);
                } else {
                    next(new UserNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };
}
