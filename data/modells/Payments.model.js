const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    _id: Number,
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    card: {
        type: {
            type: String,
            required: true,
        },
        lastFourNumbers: {
            type: Number,
            required: true,
            min: [1000],
            max: [9999],
        },
        expiryMonth: {
            type: Number,
            required: true,
            min: [1],
            max: [12],
        },
        expityYear: {
            type: Number,
            required: true,
        },
        cbbVerified:{
            type: Boolean,
            required: true
        }
    }
});

module.exports = mongoose.module('Payments', paymentSchema);