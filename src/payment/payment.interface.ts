import { Schema } from "mongoose";
export default interface IPayment {
    _id?: Schema.Types.ObjectId;
    userId?: Schema.Types.ObjectId;
    type: string;
    status: string;
    card?: {
        type: string;
        lastFourNumbers: string;
        expiryMonth: number;
        expiryYear: number;
        cbbVerified: boolean;
    };
}
