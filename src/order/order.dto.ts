import "reflect-metadata";

import { Type } from "class-transformer";
import { IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
import { Schema } from "mongoose";

import CreateShippingAddressDto from "../user/shippingAddress.dto";
// import { Match } from "./match.decorator";
import CreateBillingAddressDto from "./address.dto";
import IOrder from "./order.interface";

export default class CreateOrderDto implements IOrder {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsMongoId()
    @IsOptional()
    public userId: Schema.Types.ObjectId;

    @IsString()
    public paymentStatus: string;

    @IsString()
    public status: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateBillingAddressDto)
    public billingAddress: CreateBillingAddressDto;
}
