import { Schema } from "mongoose";
export default interface IUser {
    _id?: Schema.Types.ObjectId;
    email: string;
    email_verified: boolean;
    firstName: string;
    lastName: string;
    password: string;
    roles: string[];
    auto_login: boolean;
    address?: {
        street: string;
        city: string;
        country: string;
        zip: string;
    };
    shippingAddress?: {
        street: string;
        city: string;
        country: string;
        zip: string;
    };
}
