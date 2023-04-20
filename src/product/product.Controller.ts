import { NextFunction, Request, Response, Router } from "express";
import { Types } from "mongoose";

import HttpException from "../exceptions/HttpException";
import IdNotValidException from "../exceptions/IdNotValidException";
import ProductNotFoundException from "../exceptions/ProductNotFoundException";
import IController from "../interfaces/controller.interface";
// import IRequestWithUser from "../interfaces/requestWithUser.interface";
import authMiddleware from "../middleware/auth.middleware";
import roleCheckMiddleware from "../middleware/roleCheckMiddleware";
import validationMiddleware from "../middleware/validation.middleware";
import CreateProductDto from "./product.dto";
import IProduct from "./product.interface";
import productModel from "./product.model";

export default class ProductController implements IController {
    public path = "/products";
    public router = Router();
    private product = productModel;

    constructor() {
        this.initalizeRoutes();
    }
    private initalizeRoutes() {
        this.router.get(`${this.path}/:id`, this.getProductById);
        this.router.get(`${this.path}/arr/:num`, this.getProductArray);
        this.router.get(this.path, this.getAllProducts);
        this.router.post(
            this.path,
            [authMiddleware, roleCheckMiddleware(["admin"]), validationMiddleware(CreateProductDto)],
            this.CreateProduct,
        );

        this.router.patch(
            `${this.path}/:id`,
            [authMiddleware, roleCheckMiddleware(["admin"]), validationMiddleware(CreateProductDto, true)],
            this.modifyProduct,
        );

        this.router.delete(`${this.path}/:id`, [authMiddleware, roleCheckMiddleware(["admin"])], this.deleteProduct);
    }

    private getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.product.find().then(products => {
                res.send(products);
            });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };
    private getProductArray = async (req: Request, res: Response, next: NextFunction) => {
        const num = parseInt(req.params.first);
        if (num >= 0) {
            const product = await this.product.find().skip(num).limit(20);
            if (product) {
                res.send(product);
            }
        } else {
            next(new ProductNotFoundException("" + num));
        }
    };
    private getProductById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const product = await this.product.findById(id);
                if (product) {
                    res.send(product);
                } else {
                    next(new ProductNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private modifyProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const productData: IProduct = req.body;
                const product = await this.product.findByIdAndUpdate(id, productData, { new: true });
                if (product) {
                    res.send(product);
                } else {
                    next(new ProductNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };
    private CreateProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productData = req.body;
            const product = await this.product.create(productData);
            console.log(product);
            if (product) {
                res.send(product);
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };
    private deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const successResponse = await this.product.findByIdAndDelete(id);
                if (successResponse) {
                    res.sendStatus(200);
                } else {
                    next(new ProductNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };
}
