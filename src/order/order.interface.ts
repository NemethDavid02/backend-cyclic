import { Schema } from "mongoose";
export default interface IRecipe {
    _id?: Schema.Types.ObjectId;
    user_id?: Schema.Types.ObjectId;
    paymaentStatus: string;
    : string;
    description: string;
    ingredients: string[];
}
