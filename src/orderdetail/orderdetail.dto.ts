import "reflect-metadata";

import { Type } from "class-transformer";
import { IsMongoId, IsOptional, IsString, isInt,ValidateNested } from "class-validator";
import { Schema } from "mongoose";
 
import IOrderDetail from "./orderdetail.interface";

export default class CreateOrderDetailDto implements IOrderDetail
{
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.objectId;

    @IsMongoId()
    public productId: Schema.Types.ObjectId;

    @IsMongoId()
    public orderId: Schema.Types.ObjectId;

    @isInt()
    public archived_price: number;

    @isInt()
    public discount: number;
    
    @isInt()
    public quantity:number;
}