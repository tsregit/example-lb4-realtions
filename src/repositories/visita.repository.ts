import { DefaultCrudRepository } from '@loopback/repository';
import { Visita, VisitaRelations } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class VisitaRepository extends DefaultCrudRepository<
  Visita,
  typeof Visita.prototype.id,
  VisitaRelations
  > {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Visita, dataSource);
  }
}
