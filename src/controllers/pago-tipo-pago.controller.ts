import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pago,
  TipoPago,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoTipoPagoController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/tipo-pago', {
    responses: {
      '200': {
        description: 'TipoPago belonging to Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoPago)},
          },
        },
      },
    },
  })
  async getTipoPago(
    @param.path.string('id') id: typeof Pago.prototype.id,
  ): Promise<TipoPago> {
    return this.pagoRepository.tipoPago(id);
  }
}
