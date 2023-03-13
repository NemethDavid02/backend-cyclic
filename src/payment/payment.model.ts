import { model, Schema } from "mongoose";

import IPayment from "./payment.interface";

const CardSchema = new Schema(
    {
        type: String,
        lastFourNumbers: String,
        expiryMonth: Number,
        expiryYear: Number,
        cbbVerified: Number,
    },
    { versionKey: false },
);

const paymentSchema = new Schema<IPayment>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
        type: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        card: CardSchema,
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const paymentModel = model<IPayment>("Payments", paymentSchema, "Payments");

export default paymentModel;
