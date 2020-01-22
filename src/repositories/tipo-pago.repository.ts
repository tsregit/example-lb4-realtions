import { DefaultCrudRepository } from '@loopback/repository';
import { TipoPago, TipoPagoRelations } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class TipoPagoRepository extends DefaultCrudRepository<
  TipoPago,
  typeof TipoPago.prototype.id,
  TipoPagoRelations
  > {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(TipoPago, dataSource);
  }
}
