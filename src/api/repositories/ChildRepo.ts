import { EntityRepository, Repository } from 'typeorm';
import { ChildEntity } from '../entities/ChildEntity';

@EntityRepository(ChildEntity)
export class ChildRepo extends Repository<ChildEntity>  {

}
