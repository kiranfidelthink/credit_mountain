import { HttpError } from 'routing-controllers';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { ChildRepo } from '../repositories/ChildRepo';
import { ChildEntity } from '../entities/ChildEntity';
import { Child } from '../models/child';

@Service()
export class ChildService {

    constructor(@OrmRepository() private childRepo: ChildRepo) { }

    public async create(request: Child): Promise<ChildEntity> {
        try {
            const child: ChildEntity = Object.assign({} as ChildEntity, request);
            return await this.childRepo.save(child);
        } catch (err) {
            console.log(err);
            
            throw new HttpError(400, (err as Error).message);
        }
    };

    public async update(id: number, request: Child): Promise<ChildEntity> {
        return await this.childRepo.findOne(id)
            .then(async (data: ChildEntity) => {
                if (!data) {
                    throw new Error('No Child found');
                }
                const child = Object.assign(data, request);
                return await this.childRepo.save(child);
            })
            .catch((err) => {
                throw new HttpError(400, err.message);
            });
    };

    public async findAll(userId: number, request: Child): Promise<ChildEntity[]> {
        return await this.childRepo.find({ where: { userId, ...request } });
    };
    public async find(id: number, request: Child): Promise<ChildEntity> {
        return await this.childRepo.findOne({ where: { id, ...request } });
    };

    public async deleteChild(id: number): Promise<string> {
        return await this.childRepo.findOne(id)
            .then(async (data: ChildEntity) => {
                if (!data) {
                    throw new Error('No Child found');
                }
                await this.childRepo.remove(data);
                return "Child deleted successfully";
            })
            .catch((err) => {
                throw new HttpError(400, err.message);
            });

    };
};
