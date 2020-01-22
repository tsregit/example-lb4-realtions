import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  VisitaDueno,
  Mensaje,
} from '../models';
import {VisitaDuenoRepository} from '../repositories';

export class VisitaDuenoMensajeController {
  constructor(
    @repository(VisitaDuenoRepository)
    public visitaDuenoRepository: VisitaDuenoRepository,
  ) { }

  @get('/visita-duenos/{id}/mensaje', {
    responses: {
      '200': {
        description: 'Mensaje belonging to VisitaDueno',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mensaje)},
          },
        },
      },
    },
  })
  async getMensaje(
    @param.path.string('id') id: typeof VisitaDueno.prototype.id,
  ): Promise<Mensaje> {
    return this.visitaDuenoRepository.mensaje(id);
  }
}
