import { DefaultCrudRepository } from '@loopback/repository';
import { Dueno, DuenoRelations } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class DuenoRepository extends DefaultCrudRepository<
  Dueno,
  typeof Dueno.prototype.id,
  DuenoRelations
  > {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Dueno, dataSource);
  }
}
