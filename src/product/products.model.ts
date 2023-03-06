import { model, Schema } from "mongoose";

import IProduct from "./product.interface";

const productSchema=new Schema<IProduct>(
    {
        name:{
            type:String,
            required:true,
        },
       author:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
        }
    }
);

const productModel=model<IProduct>("Products",productSchema,"Products");

export default productModel;