import { model, Schema } from "mongoose";

import IUser from "./user.interface";

const addressSchema = new Schema(
    {
        city: String,
        country: String,
        street: String,
        zip: String,
    },
    { versionKey: false },
);

const shippingAddressSchema = new Schema(
    {
        city: String,
        country: String,
        street: String,
        zip: String,
    },
    { versionKey: false },
);

const userSchema = new Schema<IUser>(
    {
        // _id: Schema.Types.ObjectId,
        address: addressSchema,
        shippingAddress: shippingAddressSchema,
        email: {
            type: String,
            required: true,
        },
        email_verified: {
            type: Boolean,
            required: true,
        },
        auto_login: {
            type: Boolean,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: [String], // Array of string
            required: true,
        },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

userSchema.virtual("orders", {
    ref: "Orders",
    localField: "_id",
    foreignField: "userId", // ref_Field
    justOne: false,
});

userSchema.virtual("payments", {
    ref: "Payments",
    localField: "_id",
    foreignField: "userId", // ref_Field
    justOne: false,
});

const userModel = model<IUser>("Users", userSchema, "Users");

export default userModel;
