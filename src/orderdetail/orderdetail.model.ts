import {Model, Schema} from "mongoose";

import IOrderDetail from "./orderdetail.interface";
const OrderDetailSchema=new Schema<IOrderDetail>(
    {
        productId:{
            ref: "Products",
            type:Schema.Types.ObjectId,
        },
        orderId:{
            ref: "Orders",
            type:Schema.Types.ObjectId,
        },
        archived_price:{
            type:Number,
        },
        quantity:{
            type:Number,
        }
    }
)