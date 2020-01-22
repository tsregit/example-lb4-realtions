import {DefaultCrudRepository} from '@loopback/repository';
import {Dueno, DuenoRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DuenoRepository extends DefaultCrudRepository<
  Dueno,
  typeof Dueno.prototype.id,
  DuenoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Dueno, dataSource);
  }
}
