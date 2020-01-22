import { DefaultCrudRepository, HasOneRepositoryFactory, Filter, Options, repository } from '@loopback/repository';
import { TipoDeuda, TipoDeudaRelations, Deuda, TipoDeudaWithRelations } from '../models';
import { MongoDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { DeudaRepository } from '.';

export class TipoDeudaRepository extends DefaultCrudRepository<
  TipoDeuda,
  typeof TipoDeuda.prototype.id,
  TipoDeudaRelations
  > {

  public readonly deuda: HasOneRepositoryFactory<
    Deuda,
    typeof TipoDeuda.prototype.id
  >;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('DeudaRepository')
    protected deudaRepositoryGetter: Getter<DeudaRepository>,
  ) {
    super(TipoDeuda, dataSource);
    this.deuda = this.createHasOneRepositoryFactoryFor(
      'deuda',
      deudaRepositoryGetter,
    )
  }

  async find(
    filter?: Filter<TipoDeuda>,
    options?: Options,
  ): Promise<TipoDeudaWithRelations[]> {
    // Prevent juggler for applying "include" filter
    // Juggler is not aware of LB4 relations
    const include = filter?.include;
    filter = { ...filter, include: undefined };
    const result = await super.find(filter, options);

    // poor-mans inclusion resolver, this should be handled by DefaultCrudRepo
    // and use `inq` operator to fetch related todos in fewer DB queries
    // this is a temporary implementation, please see
    // https://github.com/strongloop/loopback-next/issues/3195
    if (include?.length && include[0].relation === 'deuda') {
      await Promise.all(
        result.map(async r => {
          // eslint-disable-next-line require-atomic-updates
          r.deuda = await this.deuda(r.id).get();
        }),
      );
    }

    return result;
  }

  async findById(
    id: typeof TipoDeuda.prototype.id,
    filter?: Filter<TipoDeuda>,
    options?: Options,
  ): Promise<TipoDeudaWithRelations> {
    // Prevent juggler for applying "include" filter
    // Juggler is not aware of LB4 relations
    const include = filter?.include;
    filter = { ...filter, include: undefined };

    const result = await super.findById(id, filter, options);

    // poor-mans inclusion resolver, this should be handled by DefaultCrudRepo
    // and use `inq` operator to fetch related todos in fewer DB queries
    // this is a temporary implementation, please see
    // https://github.com/strongloop/loopback-next/issues/3195
    if (include?.length && include[0].relation === 'deuda') {
      result.deuda = await this.deuda(result.id).get();
    }

    return result;
  }

}
