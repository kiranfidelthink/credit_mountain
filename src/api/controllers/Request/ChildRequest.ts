import { IsNotEmpty, IsNumber } from "class-validator";
import { Child } from "../../models/child";

export class FindChild extends Child {
    @IsNumber()
    @IsNotEmpty()
    public id: number;
}