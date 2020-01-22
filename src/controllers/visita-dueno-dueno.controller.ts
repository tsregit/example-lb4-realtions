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
  Dueno,
} from '../models';
import {VisitaDuenoRepository} from '../repositories';

export class VisitaDuenoDuenoController {
  constructor(
    @repository(VisitaDuenoRepository)
    public visitaDuenoRepository: VisitaDuenoRepository,
  ) { }

  @get('/visita-duenos/{id}/dueno', {
    responses: {
      '200': {
        description: 'Dueno belonging to VisitaDueno',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Dueno)},
          },
        },
      },
    },
  })
  async getDueno(
    @param.path.string('id') id: typeof VisitaDueno.prototype.id,
  ): Promise<Dueno> {
    return this.visitaDuenoRepository.dueno(id);
  }
}
