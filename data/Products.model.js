const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: Number,
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.module('Products', productSchema);