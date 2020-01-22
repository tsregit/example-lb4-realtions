import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Deuda,
  Dueno,
} from '../models';
import {DeudaRepository} from '../repositories';

export class DeudaDuenoController {
  constructor(
    @repository(DeudaRepository)
    public deudaRepository: DeudaRepository,
  ) { }

  @get('/deudas/{id}/dueno', {
    responses: {
      '200': {
        description: 'Dueno belonging to Deuda',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Dueno)},
          },
        },
      },
    },
  })
  async getDueno(
    @param.path.number('id') id: typeof Deuda.prototype.id,
  ): Promise<Dueno> {
    return this.deudaRepository.dueno(id);
  }
}
