import {DefaultCrudRepository} from '@loopback/repository';
import {VisitaDueno, VisitaDuenoRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VisitaDuenoRepository extends DefaultCrudRepository<
  VisitaDueno,
  typeof VisitaDueno.prototype.id,
  VisitaDuenoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(VisitaDueno, dataSource);
  }
}
