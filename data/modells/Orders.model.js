const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    _id: Number,
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    paymentStatus: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    items: [
        {
            productName: {
                type: String,
                required: true,
                unique: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: [1],
            },
            price: {
                type: Number,
                required: true,
            },
            discounts: {
                type: Number,
                required: false,
                min: [100],
            },
        },
    ],
    shippingAdress: {
        country: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        zip: {
            type: Number,
            required: true,
        },
    },
    billingAddress: {
        country: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        zip: {
            type: Number,
            required: true,
        },
    },
});

module.exports = mongoose.module("Orders", ordersSchema);
