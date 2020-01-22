import { DefaultCrudRepository, Filter, Options, BelongsToAccessor, repository } from '@loopback/repository';
import { Deuda, DeudaRelations, DeudaWithRelations } from '../models';
import { MongoDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { TipoDeuda } from '../models/tipo-deuda.model';
import { TipoDeudaRepository } from '.';

export class DeudaRepository extends DefaultCrudRepository<
  Deuda,
  typeof Deuda.prototype.id,
  DeudaRelations
  > {
  public readonly tipoDeuda: BelongsToAccessor<
    TipoDeuda,
    typeof Deuda.prototype.id
  >;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('TipoDeudaRepository')
    protected getTipoDeudaRepository: Getter<TipoDeudaRepository>,
  ) {
    super(Deuda, dataSource);
    this.tipoDeuda = this.createBelongsToAccessorFor(
      'tipoDeuda',
      getTipoDeudaRepository,
    );
  }

  async find(
    filter?: Filter<Deuda>,
    options?: Options,
  ): Promise<DeudaWithRelations[]> {
    // Prevent juggler for applying "include" filter
    // Juggler is not aware of LB4 relations
    const include = filter?.include;
    filter = { ...filter, include: undefined };
    const result = await super.find(filter, options);

    // poor-mans inclusion resolver, this should be handled by DefaultCrudRepo
    // and use `inq` operator to fetch related todos in fewer DB queries
    // this is a temporary implementation, please see
    // https://github.com/strongloop/loopback-next/issues/3195
    if (include?.length && include[0].relation === 'tipoDeuda') {
      await Promise.all(
        result.map(async r => {
          // eslint-disable-next-line require-atomic-updates
          r.tipoDeuda = await this.tipoDeuda(r.id);
        }),
      );
    }

    return result;
  }

  async findById(
    id: typeof Deuda.prototype.id,
    filter?: Filter<Deuda>,
    options?: Options,
  ): Promise<DeudaWithRelations> {
    // Prevent juggler for applying "include" filter
    // Juggler is not aware of LB4 relations
    const include = filter?.include;
    filter = { ...filter, include: undefined };

    const result = await super.findById(id, filter, options);

    // poor-mans inclusion resolver, this should be handled by DefaultCrudRepo
    // and use `inq` operator to fetch related todos in fewer DB queries
    // this is a temporary implementation, please see
    // https://github.com/strongloop/loopback-next/issues/3195
    if (include?.length && include[0].relation === 'tipoDeuda') {
      result.tipoDeuda = await this.tipoDeuda(result.id);
    }

    return result;
  }

}
