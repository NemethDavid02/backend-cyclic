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
import CreateProductDto from "./product.dto";
import IProduct from "./product.interface";
import productModel from "./products.model";

export default class OrderController implements IController{
    public path="/products";
    public router=Router();
    private product=productModel;

    constructor(){
        this.initalizeRoutes();
    }
    private initalizeRoutes(){
        this.router.get(`${this.path}/:id`, authMiddleware, this.getProductById);
        this.router.get(this.path, this.getAllProducts);

        this.router.patch(`${this.path}/:id`, [authMiddleware, roleCheckMiddleware(["admin"]), validationMiddleware(CreateProductDto, true)], this.modifyProduct);

        this.router.delete(`${this.path}/:id`, [authMiddleware, roleCheckMiddleware(["admin"])], this.deleteProduct);
    }

    private getAllProducts=async(req:Request,res:Response, next: NextFunction)=>{
        try{
            this.product.find().then(products=>{
                res.send(products)
            });
        } catch(error){

        }
    };

    private getProductById=async(req:Request,res:Response, next: NextFunction)=>{
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const product = await this.product.findById(id).populate("posts");
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

    private modifyProduct=async(req:Request,res:Response, next: NextFunction)=>{
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const productData: IProduct = req.body;
                const product = await this.product.findByIdAndUpdate(id, productData, { new: true });
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

    private deleteProduct=async(req:Request,res:Response, next: NextFunction)=>{
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const successResponse = await this.product.findByIdAndDelete(id);
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