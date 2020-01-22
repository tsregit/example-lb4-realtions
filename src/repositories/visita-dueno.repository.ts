import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {VisitaDueno, VisitaDuenoRelations, Dueno, Visita, Mensaje} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DuenoRepository} from './dueno.repository';
import {VisitaRepository} from './visita.repository';
import {MensajeRepository} from './mensaje.repository';

export class VisitaDuenoRepository extends DefaultCrudRepository<
  VisitaDueno,
  typeof VisitaDueno.prototype.id,
  VisitaDuenoRelations
> {

  public readonly dueno: BelongsToAccessor<Dueno, typeof VisitaDueno.prototype.id>;

  public readonly visita: BelongsToAccessor<Visita, typeof VisitaDueno.prototype.id>;

  public readonly mensaje: BelongsToAccessor<Mensaje, typeof VisitaDueno.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('DuenoRepository') protected duenoRepositoryGetter: Getter<DuenoRepository>, @repository.getter('VisitaRepository') protected visitaRepositoryGetter: Getter<VisitaRepository>, @repository.getter('MensajeRepository') protected mensajeRepositoryGetter: Getter<MensajeRepository>,
  ) {
    super(VisitaDueno, dataSource);
    this.mensaje = this.createBelongsToAccessorFor('mensaje', mensajeRepositoryGetter,);
    this.registerInclusionResolver('mensaje', this.mensaje.inclusionResolver);
    this.visita = this.createBelongsToAccessorFor('visita', visitaRepositoryGetter,);
    this.registerInclusionResolver('visita', this.visita.inclusionResolver);
    this.dueno = this.createBelongsToAccessorFor('dueno', duenoRepositoryGetter,);
    this.registerInclusionResolver('dueno', this.dueno.inclusionResolver);
  }
}
