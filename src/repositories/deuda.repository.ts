import { DefaultCrudRepository, BelongsToAccessor, repository } from '@loopback/repository';
import { Deuda, DeudaRelations, Dueno, Pago } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { TipoDeuda } from '../models/tipo-deuda.model';
import { TipoDeudaRepository } from '.';
import { DuenoRepository } from './dueno.repository';
import { PagoRepository } from './pago.repository';

export class DeudaRepository extends DefaultCrudRepository<
  Deuda,
  typeof Deuda.prototype.id,
  DeudaRelations
  > {
  public readonly tipoDeuda: BelongsToAccessor<
    TipoDeuda,
    typeof Deuda.prototype.id
  >;

  public readonly dueno: BelongsToAccessor<Dueno, typeof Deuda.prototype.id>;

  public readonly pago: BelongsToAccessor<Pago, typeof Deuda.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('TipoDeudaRepository')
    protected getTipoDeudaRepository: Getter<TipoDeudaRepository>, @repository.getter('DuenoRepository') protected duenoRepositoryGetter: Getter<DuenoRepository>, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>,
  ) {
    super(Deuda, dataSource);
    this.pago = this.createBelongsToAccessorFor('pago', pagoRepositoryGetter);
    this.registerInclusionResolver('pago', this.pago.inclusionResolver);
    this.dueno = this.createBelongsToAccessorFor('dueno', duenoRepositoryGetter);
    this.registerInclusionResolver('dueno', this.dueno.inclusionResolver);
    this.tipoDeuda = this.createBelongsToAccessorFor(
      'tipoDeuda',
      getTipoDeudaRepository,
    );
    this.registerInclusionResolver('tipoDeuda', this.tipoDeuda.inclusionResolver);
  }

}
