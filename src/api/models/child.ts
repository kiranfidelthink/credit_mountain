import { IsNumber, IsOptional, IsString } from "class-validator";

export class Child {
    @IsOptional()
    @IsNumber()
    public age: number;
    @IsOptional()
    @IsString()
    public name: string;
    @IsOptional()
    public userId: number;
}