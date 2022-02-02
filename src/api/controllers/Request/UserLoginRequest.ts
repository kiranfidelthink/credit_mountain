export class UserLoginRequest {
    public email: string;
    public password: string;
}

export class RequestWithUser{
    public decoded : {
        user : {
            id : number
        }
    }
}