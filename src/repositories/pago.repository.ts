import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { Pago, PagoRelations, TipoPago } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { TipoPagoRepository } from './tipo-pago.repository';

export class PagoRepository extends DefaultCrudRepository<
  Pago,
  typeof Pago.prototype.id,
  PagoRelations
  > {

  public readonly tipoPago: BelongsToAccessor<TipoPago, typeof Pago.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('TipoPagoRepository') protected tipoPagoRepositoryGetter: Getter<TipoPagoRepository>,
  ) {
    super(Pago, dataSource);
    this.tipoPago = this.createBelongsToAccessorFor('tipoPago', tipoPagoRepositoryGetter);
    this.registerInclusionResolver('tipoPago', this.tipoPago.inclusionResolver);
  }
}
