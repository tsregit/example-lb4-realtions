import { DefaultCrudRepository } from '@loopback/repository';
import { TipoDeuda, TipoDeudaRelations } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class TipoDeudaRepository extends DefaultCrudRepository<
  TipoDeuda,
  typeof TipoDeuda.prototype.id,
  TipoDeudaRelations
  > {

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(TipoDeuda, dataSource);
  }

}
