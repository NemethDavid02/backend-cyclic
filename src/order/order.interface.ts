import { Schema } from "mongoose";

import IAddress from "../user/address.interface";
export default interface IOrder {
    _id?: Schema.Types.ObjectId;
    userId?: Schema.Types.ObjectId;
    paymentStatus: string;
    status: string;
    shippingAddress?: IAddress;
    billingAddress?: IAddress;
}
