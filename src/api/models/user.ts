import { IsString } from "class-validator";

export class User {
    @IsString()
    public email: string;
    @IsString()
    public password: string;
    @IsString()
    public name: string;
}