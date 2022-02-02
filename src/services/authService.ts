import { Service } from 'typedi';

@Service()
export class AuthService {

    public async getDetails(res: string): Promise<string> {
        return res;
    }
}
