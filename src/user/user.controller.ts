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
import CreateUserDto from "./user.dto";
import IUser from "./user.interface";
import userModel from "./user.model";

export default class UserController implements IController {
    public path = "/users";
    public router = Router();
    private user = userModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
        this.router.get(this.path, this.getAllUsers);
        this.router.patch(
            `${this.path}/:id`,
            [authMiddleware, roleCheckMiddleware(["admin"]), validationMiddleware(CreateUserDto, true)],
            this.modifyUser,
        );
        this.router.delete(`${this.path}/:id`, [authMiddleware, roleCheckMiddleware(["admin"])], this.deleteUser);
    }

    private getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.user.find().then(users => {
                res.send(users);
            });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                // const userQuery = this.user.findById(id);
                // if (request.query.withPosts === "true") {
                //     userQuery.populate("posts").exec();
                // }
                const user = await this.user.findById(id);
                if (user) {
                    res.send(user);
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

    private modifyUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const userData: IUser = req.body;
                const user = await this.user.findByIdAndUpdate(id, userData, { new: true });
                if (user) {
                    res.send(user);
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

    private deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const successResponse = await this.user.findByIdAndDelete(id);
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
