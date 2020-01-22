import { DefaultCrudRepository } from '@loopback/repository';
import { Mensaje, MensajeRelations } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class MensajeRepository extends DefaultCrudRepository<
  Mensaje,
  typeof Mensaje.prototype.id,
  MensajeRelations
  > {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Mensaje, dataSource);
  }
}
