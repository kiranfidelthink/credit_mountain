import { EntityRepository, Repository } from 'typeorm';
import { TransactionsEntity } from '../entities/TransactionsEntity';

@EntityRepository(TransactionsEntity)
export class TransactionRepo extends Repository<TransactionsEntity>  {

}
