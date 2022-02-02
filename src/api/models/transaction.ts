import { IsNumber, IsString } from "class-validator";

export class Transaction {
    public id: number;
    public cardId: number;
    @IsNumber()
    public amount: number;
    public createdAt: Date;
    public updatedAt: Date;
}