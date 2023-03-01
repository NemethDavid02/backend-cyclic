import { isEmail } from 'validator';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        validate: [ isEmail, 'invalid email' ]
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        require:true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    address: {
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
        }
    },
    shippingAddress: {
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
        }
    }
});

module.exports = mongoose.module('Users', UserSchema);