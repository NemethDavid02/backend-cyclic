/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsBoolean, IsInt, IsString } from "class-validator";

import ICard from "./card.interface";

export default class CreateCardDto implements ICard {
    @IsString()
    public type: string;
    @IsString()
    public lastFourNumbers: string;
    @IsInt()
    public expiryMonth: number;
    @IsInt()
    public expiryYear: number;
    @IsBoolean()
    public cbbVerified: boolean;
}
