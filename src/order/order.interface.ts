import { Schema } from "mongoose";

export default interface IOrder {
    _id?: Schema.Types.ObjectId;
    userId?: Schema.Types.ObjectId;
    paymentStatus: string;
    status: string;
    billingAddress?: {
        street: string;
        city: string;
        country: string;
        zip: number;
    };
}
