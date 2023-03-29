import "reflect-metadata";

import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
import { Schema } from "mongoose";

// import { Match } from "./match.decorator";
import CreateAddressDto from "./address.dto";
import CreateShippingAddressDto from "./address.dto";
import IUser from "./user.interface";

export default class CreateUserDto implements IUser {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsString()
    public firstName: string;

    @IsString()
    public lastName: string;

    @IsEmail()
    public email: string;

    // Example - compare two fields in document:
    // @IsEmail()
    // @Match("email", { message: "email and email_address_confirm don't match." })
    // public email_address_confirm: string;

    @IsBoolean()
    public email_verified: boolean;

    @IsBoolean()
    public auto_login: boolean;

    @IsString()
    public password: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    public roles: string[];

    // For validating nested object you must import reflect-metadata and define @Type:
    @ValidateNested()
    @Type(() => CreateAddressDto)
    public address: CreateAddressDto;

    @ValidateNested()
    @Type(() => CreateShippingAddressDto)
    public shippingAddress: CreateShippingAddressDto;
}
