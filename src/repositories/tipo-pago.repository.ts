import {DefaultCrudRepository} from '@loopback/repository';
import {TipoPago, TipoPagoRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TipoPagoRepository extends DefaultCrudRepository<
  TipoPago,
  typeof TipoPago.prototype.id,
  TipoPagoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(TipoPago, dataSource);
  }
}
