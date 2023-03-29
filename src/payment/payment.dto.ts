import "reflect-metadata";

import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
import { Schema } from "mongoose";

import CreateCardDto from "./card.dto";
import IPayment from "./payment.interface";

export default class CreatePaymentDto implements IPayment {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsMongoId()
    public userId: Schema.Types.ObjectId;

    @IsString()
    public type: string;

    @IsString()
    public status: string;

    @ValidateNested()
    @Type(() => CreateCardDto)
    public card: CreateCardDto;
}
