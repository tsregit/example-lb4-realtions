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
  Pago,
} from '../models';
import {DeudaRepository} from '../repositories';

export class DeudaPagoController {
  constructor(
    @repository(DeudaRepository)
    public deudaRepository: DeudaRepository,
  ) { }

  @get('/deudas/{id}/pago', {
    responses: {
      '200': {
        description: 'Pago belonging to Deuda',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pago)},
          },
        },
      },
    },
  })
  async getPago(
    @param.path.number('id') id: typeof Deuda.prototype.id,
  ): Promise<Pago> {
    return this.deudaRepository.pago(id);
  }
}
