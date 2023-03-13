import { model, Schema } from "mongoose";

import IAddress from "../user/address.interface";
import IOrder from "./order.interface";

const shippingAddressSchema = new Schema<IAddress>(
    {
        city: String,
        country: String,
        street: String,
        zip: String,
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const billingAddressSchema = new Schema<IAddress>(
    {
        city: String,
        country: String,
        street: String,
        zip: String,
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const orderSchema = new Schema<IOrder>(
    {
        // _id: Schema.Types.ObjectId,
        userId: {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
        paymentStatus: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        shippingAddress: shippingAddressSchema,
        billingAddress: billingAddressSchema,
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

orderSchema.virtual("user", {
    ref: "Users",
    localField: "userId",
    foreignField: "_id", // ref_Field
    justOne: true,
});

const orderModel = model<IOrder>("Orders", orderSchema, "Orders");

export default orderModel;
