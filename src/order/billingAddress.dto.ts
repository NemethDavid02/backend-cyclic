/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsString } from "class-validator";

import IBillingAddress from "./billingAddress.interface";

export default class CreateBillingAddressDto implements IBillingAddress {
    @IsString()
    public street: string;
    @IsString()
    public city: string;
    @IsString()
    public country: string;
    @IsString()
    public zip: string;
}
