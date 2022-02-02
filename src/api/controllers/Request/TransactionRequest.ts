import { IsNotEmpty, IsNumber } from "class-validator";

export class GetTransactionsByCard {
    @IsNumber()
    @IsNotEmpty()
    public card_id: number;
}