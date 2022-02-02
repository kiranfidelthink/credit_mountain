import { IsNotEmpty, IsNumber } from "class-validator";
import { CreditCard } from "../../models/creditCard";

export class CreditUpdateRequest {
    @IsNumber()
    @IsNotEmpty()
    public monthlyLimit: number;
}

export class FindCreditCard extends CreditCard {
    @IsNumber()
    @IsNotEmpty()
    public id: number;
}