import { model, Schema } from "mongoose";

import IOrder from "./order.interface";

const shippingAddressSchema = new Schema(
    {
        city: String,
        country: String,
        street: String,
        zip: String
    },
    { versionKey: false },
    );

    const billingAddressSchema = new Schema(
        {
            city: String,
            country: String,
            street: String,
            zip: String
        },
        { versionKey: false },
    );
    
const orderSchema = new Schema<IOrder>(
    {
        _id: Schema.Types.ObjectId,
        userId: Schema.Types.ObjectId,
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

orderSchema.virtual("orderDetails", {
    ref: "OrderDetails",
    localField: "_id",
    foreignField: "orderId", // ref_Field
    justOne: false,
});

const orderModel = model<IOrder>("Orders", orderSchema, "orders");

export default orderModel;
