import "reflect-metadata";

import { IsInt, IsMongoId, IsOptional } from "class-validator";
import { Schema } from "mongoose";

import IOrderDetail from "./orderdetail.interface";

export default class CreateOrderDetailDto implements IOrderDetail {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsMongoId()
    public productId: Schema.Types.ObjectId;

    @IsMongoId()
    public orderId: Schema.Types.ObjectId;

    @IsInt()
    public archived_price: number;

    @IsInt()
    public discount: number;

    @IsInt()
    public quantity: number;
}
