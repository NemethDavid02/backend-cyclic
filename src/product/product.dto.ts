import "reflect-metadata";

import { Type } from "class-transformer";
import { IsInt, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
import { Schema } from "mongoose";

import IProduct from "./product.interface";

export default class CreateProductDto implements IProduct {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsString()
    public name: string;

    @IsString()
    public author: string;

    @IsInt()
    public price: number;

    @IsInt()
    public quantity: number;
}
