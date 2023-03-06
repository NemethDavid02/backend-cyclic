import { Schema } from "mongoose";
export default interface IProduct {
    _id?: Schema.Types.ObjectId;
    name: string;
    author: string;
    price: number;
    quantity: number;
}
