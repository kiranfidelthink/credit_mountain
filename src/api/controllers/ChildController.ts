
import { Response } from 'express';
import {
    Body,
    Delete,
    Get,
    HttpCode, JsonController, Param, Params, Post, Put, QueryParams, Req, Res, UseBefore,
} from 'routing-controllers';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { ChildService } from '../services/ChildService';
import { Child } from '../models/child';
import { validateToken } from '../../../src/utils/commonUtil';
import { RequestWithUser } from './Request/UserLoginRequest';
import { FindChild } from './Request/ChildRequest';

@UseBefore(validateToken)
@JsonController('/child')
export class ChildController {

    constructor(@Logger(__filename) private logger: LoggerInterface, private childService: ChildService) { }

    @Post()
    @HttpCode(200)
    public async create(@Body() body: Child, @Res() response: Response): Promise<Response> {
        return response.status(200).send(await this.childService.create(body));
    }

    @Put('/:id')
    @HttpCode(201)
    public async update(@Body() body: Child, @Res() response: Response, @Param('id') id: number): Promise<Response> {
        return response.status(201).send(await this.childService.update(id, body));
    }

    @Get('/:id')
    @HttpCode(200)
    public async findChild(@Res() response: Response, @Params() params: FindChild): Promise<Response> {
        return response.status(200).send(await this.childService.find(params.id, params));
    }
    @Get()
    @HttpCode(200)
    public async findAllChild(@Res() response: Response, @Req() request: RequestWithUser, @QueryParams() queryParams: Child): Promise<Response> {
        return response.status(200).send(await this.childService.findAll(request.decoded.user.id, queryParams));
    }

    @Delete('/:id')
    public async deleteChild(@Res() response: Response, @Param('id') id: number): Promise<Response> {
        return response.status(201).send(await this.childService.deleteChild(id));
    }
}