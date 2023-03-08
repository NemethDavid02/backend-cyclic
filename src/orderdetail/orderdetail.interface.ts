import { Schema } from "mongoose";
export default interface IOrderDetail {
    _id?: Schema.Types.ObjectId;
    productId: Schema.Types.ObjectId;
    orderId: Schema.Types.ObjectId;
    archived_price: number;
    quantity: number;
}
