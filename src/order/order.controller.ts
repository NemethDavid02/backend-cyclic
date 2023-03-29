import { NextFunction, Request, Response, Router } from "express";
import { Types } from "mongoose";

import HttpException from "../exceptions/HttpException";
import IdNotValidException from "../exceptions/IdNotValidException";
import OrderNotFoundException from "../exceptions/OrderNotFoundException";
import IController from "../interfaces/controller.interface";
// import IRequestWithUser from "../interfaces/requestWithUser.interface";
import authMiddleware from "../middleware/auth.middleware";
import roleCheckMiddleware from "../middleware/roleCheckMiddleware";
import validationMiddleware from "../middleware/validation.middleware";
import CreateOrderDto from "./order.dto";
import IOrder from "./order.interface";
import orderModel from "./order.model";

export default class OrderController implements IController {
    public path = "/orders";
    public router = Router();
    private order = orderModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, authMiddleware, this.getOrderById);
        this.router.get(this.path, this.getAllOrders);
        this.router.post(
            this.path,
            [authMiddleware, validationMiddleware(CreateOrderDto)],
            this.CreateOrder,
        );
        this.router.patch(
            `${this.path}/:id`,
            [authMiddleware, roleCheckMiddleware(["admin"]), validationMiddleware(CreateOrderDto, true)],
            this.modifyOrder,
        );

        this.router.delete(`${this.path}/:id`, [authMiddleware, roleCheckMiddleware(["admin"])], this.deleteOrder);
    }

    private getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.order.find().then(orders => {
                res.send(orders);
            });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getOrderById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                // const userQuery = this.user.findById(id);
                // if (request.query.withPosts === "true") {
                //     userQuery.populate("posts").exec();
                // }
                const order = await this.order.findById(id).populate("userId");
                if (order) {
                    res.send(order);
                } else {
                    next(new OrderNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private modifyOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const orderData: IOrder = req.body;
                const order = await this.order.findByIdAndUpdate(id, orderData, { new: true });
                if (order) {
                    res.send(order);
                } else {
                    next(new OrderNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private CreateOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderData = req.body;
            const order = await this.order.create(orderData);
            console.log(order);
            if (order) {
                res.send(order);
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const successResponse = await this.order.findByIdAndDelete(id);
                if (successResponse) {
                    res.sendStatus(200);
                } else {
                    next(new OrderNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };
}
