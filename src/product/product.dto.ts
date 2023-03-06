import "reflect-metadata";

import { Type } from "class-transformer";
import { IsMongoId, IsOptional, IsString, isInt,ValidateNested } from "class-validator";
import { Schema } from "mongoose";

import IProduct from "./product.interface";

export default class CreateProductDto implements IProduct {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.objectId;

    @IsString()
    public name: string;

    @IsString()
    public author: string;

    @isInt()
    public price:number;
    
    @isInt()
    public quantity:number;
}