
import { Response } from 'express';
import {
    Body, Get, JsonController, Param, Post, QueryParams, Res, UseBefore,
} from 'routing-controllers';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { validateToken } from '../../../src/utils/commonUtil';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/TransactionService';
import { GetTransactionsByCard } from './Request/TransactionRequest';

@UseBefore(validateToken)
@JsonController('/charge')
export class CreditCardController {

    constructor(@Logger(__filename) private logger: LoggerInterface, private transactionService: TransactionService) { }

    @Post('/:card_id')
    public async createCharge(@Res() response: Response, @Param('card_id') cardId: number, @Body() body : Transaction): Promise<Response> {
        return response.status(201).send(await this.transactionService.createCharge(cardId, body));
    }

    @Get('/:id')
    public async findTransaction(@Res() response: Response, @Param('id') id: number ): Promise<Response> {
        return response.status(200).send(await this.transactionService.findTransaction(id));
    }
    
    @Get()
    public async findAllTransaction(@Res() response: Response, @QueryParams() params : GetTransactionsByCard ): Promise<Response> {
        return response.status(200).send(await this.transactionService.findAllTransaction(params.card_id));
    }
}
