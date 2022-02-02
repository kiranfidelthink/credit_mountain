import { HttpError } from 'routing-controllers';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { CreditCardRepo } from '../repositories/CreditRepo';
import { CreditCardEntity } from '../entities/CreditCardEntity';
import { CreditCard } from '../models/creditCard';
import { CreditUpdateRequest } from '../controllers/Request/CreditRequest';

@Service()
export class CreditCardService {

    constructor(@OrmRepository() private creditCardRepo: CreditCardRepo) { }

    public async create(request: CreditCard): Promise<CreditCardEntity> {
        try {
            const creditCard = await this.creditCardRepo.findOne({ where: { number : request.number } })
            if (creditCard) {
                throw new Error('Card already exists');    
            }
            
            const CreditCard: CreditCardEntity = Object.assign({} as CreditCardEntity, request);
            return await this.creditCardRepo.save(CreditCard);
        } catch (err) {
            throw new HttpError(400, (err as Error).message);
        }
    };

    public async update(id: number, request: CreditUpdateRequest): Promise<CreditCardEntity> {
        return await this.creditCardRepo.findOne(id)
            .then(async (data: CreditCardEntity) => {
                if (!data) {
                    throw new Error('No CreditCard found');
                }
                data.monthlyLimit = request.monthlyLimit;
                return await this.creditCardRepo.save(data);
            })
            .catch((err) => {
                throw new HttpError(400, err.message);
            });
    };

    public async findAll(request: CreditCard): Promise<CreditCardEntity[]> {
        return await this.creditCardRepo.find({ where: { ...request } });
    };
    public async find(id: number, request: CreditCard): Promise<CreditCardEntity> {
        return await this.creditCardRepo.findOne({ where: { id, ...request } });
    };

    public async deleteCreditCard(id: number): Promise<string> {
        return await this.creditCardRepo.findOne(id)
            .then(async (data: CreditCardEntity) => {
                if (!data) {
                    throw new Error('No CreditCard found');
                }
                await this.creditCardRepo.remove(data);
                return 'Credit Card deleted successfully'
            })
            .catch((err) => {
                throw new HttpError(400, err.message);
            });

    };
};
