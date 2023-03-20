/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsString, IsInt } from "class-validator";

import IShippingAddress from "./shippingAddress.interface";

export default class CreateShippingAddressDto implements IShippingAddress {
    @IsString()
    public street: string;
    @IsString()
    public city: string;
    @IsString()
    public country: string;
    @IsInt()
    public zip: number;
}
