
import { Response } from 'express';
import {
    Body,
    HttpCode, JsonController, Post, Res,
} from 'routing-controllers';
import { AuthService } from '../services/AuthService';
import { UserLoginRequest } from './Request/UserLoginRequest';
import { User } from '../models/user';

@JsonController('/auth')
export class AuthController {

    constructor(private authService: AuthService) { }
    @Post('/login')
    @HttpCode(200)
    public async login(@Body() body: UserLoginRequest, @Res() response: Response): Promise<Response> {
        return response.status(200).send(await this.authService.login(body));
    }

    @Post('/register')
    @HttpCode(201)
    public async register(@Body() body: User, @Res() response: Response): Promise<Response> {
        return response.status(201).send(await this.authService.register(body));
    }
}
