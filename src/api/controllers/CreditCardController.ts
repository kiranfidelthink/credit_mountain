
import { Response } from 'express';
import {
    Body,
    Delete,
    Get,
    HttpCode, JsonController, Param, Params, Post, Put, QueryParams, Req, Res, UseBefore,
} from 'routing-controllers';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { CreditCardService } from '../services/CreditCardService';
import { CreditCard } from '../models/creditCard';
import { validateToken } from '../../../src/utils/commonUtil';
import { CreditUpdateRequest, FindCreditCard } from './Request/CreditRequest';

@UseBefore(validateToken)
@JsonController('/credit')
export class CreditCardController {

    constructor(@Logger(__filename) private logger: LoggerInterface, private creditCardService: CreditCardService) { }

    @Post()
    @HttpCode(200)
    public async create(@Body() body: CreditCard, @Res() response: Response): Promise<Response> {
        return response.status(200).send(await this.creditCardService.create(body));
    }

    @Put('/:id')
    @HttpCode(201)
    public async update(@Body() body: CreditUpdateRequest, @Res() response: Response, @Param('id') id: number): Promise<Response> {
        return response.status(201).send(await this.creditCardService.update(id, body));
    }

    @Get('/:id')
    @HttpCode(200)
    public async findCreditCard(@Res() response: Response, @Params() params: FindCreditCard): Promise<Response> {
        return response.status(200).send(await this.creditCardService.find(params.id, params));
    }
    @Get()
    @HttpCode(200)
    public async findAllCreditCard(@Res() response: Response, @QueryParams() queryParams: CreditCard): Promise<Response> {
        return response.status(200).send(await this.creditCardService.findAll(queryParams));
    }

    @Delete('/:id')
    public async deleteCreditCard(@Res() response: Response, @Param('id') id: number): Promise<Response> {
        return response.status(201).send(await this.creditCardService.deleteCreditCard(id));
    }
}
