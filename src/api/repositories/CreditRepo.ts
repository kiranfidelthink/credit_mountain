import { EntityRepository, Repository } from 'typeorm';
import { CreditCardEntity } from '../entities/CreditCardEntity';

@EntityRepository(CreditCardEntity)
export class CreditCardRepo extends Repository<CreditCardEntity>  {

}
