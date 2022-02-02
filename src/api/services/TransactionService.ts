import { HttpError } from 'routing-controllers';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Transaction } from '../models/transaction';
import { TransactionRepo } from '../repositories/TransactionRepo';
import moment from 'moment';
import { MoreThan } from 'typeorm';
import { CARD_DECLINED, EXPIRED_CARD, AMOUNT_TOO_LARGE, CHARGE_EXCEEDS_SOURCE_LIMIT } from '../common/ChargeErrors';
import { TransactionsEntity } from '../entities/TransactionsEntity';
import { CreditCardRepo } from '../repositories/CreditRepo';

@Service()
export class TransactionService {

    constructor(@OrmRepository() private transactionRepo: TransactionRepo, @OrmRepository() private creditCardRepo: CreditCardRepo) { }

    public async createCharge(id: number, request: Transaction): Promise<TransactionsEntity> {
        try {
            const creditCard = await this.creditCardRepo.findOne({ where : { id } })
            if (!creditCard) {
                throw new HttpError(400, CARD_DECLINED);
            }
            
            if ( moment().isAfter(moment(creditCard.expiryDate)) ) {
                throw new HttpError(400, EXPIRED_CARD);
            }

            if ( request.amount > creditCard.monthlyLimit ) {
                throw new HttpError(400, AMOUNT_TOO_LARGE);
            }

            const { sum } = await this.transactionRepo.createQueryBuilder("transactions")
            .where({ 
                cardId : id, 
                createdAt : MoreThan(moment().startOf('month').toISOString()) 
            })
            .select("SUM(transactions.amount)", "sum")
            .getRawOne(); 
            console.log("Sum : ", sum);
            
            // .find({ where : { cardId : id, createdAt : MoreThan(moment().startOf('month').toISOString()) } })            
            // const monthSpend = transaction.map(obj => obj.amount).reduce((partialSum, a) => Number(partialSum) + Number(a), 0);
            if ( Number(sum) + Number(request.amount) > creditCard.monthlyLimit ) {
                throw new HttpError(400, CHARGE_EXCEEDS_SOURCE_LIMIT);
            }

            console.log(creditCard.monthlyLimit, sum, request.amount);
            
            return await this.transactionRepo.save({
                cardId : id,
                cardDetails : creditCard,
                amount : request.amount,
                balance : Number(creditCard.monthlyLimit) - Number(sum) - Number(request.amount)
            })
        } catch (err) {
            throw new HttpError(400, (err as Error).message);
        }
    };

    public async findTransaction(id: number): Promise<TransactionsEntity> {
        return await this.transactionRepo.findOne({ where: { id } });
    };

    public async findAllTransaction(cardId: number): Promise<Array<TransactionsEntity>> {
        return await this.transactionRepo.find({ where: { cardId } });
    };
};
