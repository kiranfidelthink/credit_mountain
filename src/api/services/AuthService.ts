import { HttpError } from 'routing-controllers';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserRepo } from '../repositories/UserRepo';
import { generateToken } from '../../utils/commonUtil'
import bcrypt from "bcrypt";
import { UserEntity } from '../entities/UserEntity';
import { User } from '../models/user';
import { UserLoginRequest } from '../controllers/Request/UserLoginRequest';
import { LoginResponse } from '../controllers/Response/AuthResponse';

@Service()
export class AuthService {

    constructor(@OrmRepository() private userRepo: UserRepo) { }

    public async login(request: UserLoginRequest): Promise<LoginResponse> {
        return await this.userRepo.findOne({ where: { email: request.email } })
            .then(async (data: UserEntity) => {
                if (data !== null) {
                    const user = {
                        username: data.email,
                        id: data.id,
                    };
                    const payload = { user };
                    const token = generateToken(payload, "2d");
                    return await bcrypt
                        .compare(request.password, data.password)
                        .then((match) => {
                            if (match) {
                                return { token: token };
                            } else {
                                throw new Error('User enters an invalid password');
                            }
                        });

                } else {
                    throw new Error(`Can not find User with given username ${request.email}. User was not found!`);
                }
            })
            .catch((err) => {
                throw new HttpError(400, err.message);
            });
    };

    public async register(request: User): Promise<string> {
        return await this.userRepo.findOne({ where: { email: request.email } })
            .then(async (data: UserEntity) => {
                if (data) {
                    throw new Error('User already exists');
                }
                const password = request.password;
                const user = Object.assign({}, request);
                user.password = bcrypt.hashSync(password, 10);
                await this.userRepo.save(user);
                return 'Successfully Registered'
            })
            .catch((err) => {
                throw new HttpError(400, err.message);
            });
    };
};
