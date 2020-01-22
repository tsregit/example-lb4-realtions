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
  Visita,
} from '../models';
import {VisitaDuenoRepository} from '../repositories';

export class VisitaDuenoVisitaController {
  constructor(
    @repository(VisitaDuenoRepository)
    public visitaDuenoRepository: VisitaDuenoRepository,
  ) { }

  @get('/visita-duenos/{id}/visita', {
    responses: {
      '200': {
        description: 'Visita belonging to VisitaDueno',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visita)},
          },
        },
      },
    },
  })
  async getVisita(
    @param.path.string('id') id: typeof VisitaDueno.prototype.id,
  ): Promise<Visita> {
    return this.visitaDuenoRepository.visita(id);
  }
}
