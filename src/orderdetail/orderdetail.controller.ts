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
import CreateOrderDetailDto from "./orderdetail.dto";
import IOrderDetail from "./orderdetail.interface";
import orderdetailmodel from "./orderdetail.model";

export default class OrderDetailController implements IController {
    public path = "/orderdetails";
    public router = Router();
    public orderdetail = orderdetailmodel;

    constructor() {
        this.initalizeRoutes();
    }

    private initalizeRoutes() {
        this.router.get(`${this.path}/:id`, authMiddleware, this.getOrderDetailById);
        this.router.get(this.path, this.getAllOrderDetails);

        this.router.patch(
            `${this.path}/:id`,
            [authMiddleware, roleCheckMiddleware(["admin"]), validationMiddleware(CreateOrderDetailDto, true)],
            this.modifyOrderDetail,
        );

        this.router.delete(
            `${this.path}/:id`,
            [authMiddleware, roleCheckMiddleware(["admin"])],
            this.deleteOrderDetail,
        );
    }

    private getAllOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.orderdetail.find().then(orderdetails => {
                res.send(orderdetails);
            });
        } catch (error) {}
    };

    private getOrderDetailById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const product = await this.orderdetail.findById(id).populate("posts");
                if (product) {
                    res.send(product);
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

    private modifyOrderDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const orderdetailData: IOrderDetail = req.body;
                const orderdetail = await this.orderdetail.findByIdAndUpdate(id, orderdetailData, { new: true });
                if (orderdetail) {
                    res.send(orderdetail);
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

    private deleteOrderDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const successResponse = await this.orderdetail.findByIdAndDelete(id);
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
