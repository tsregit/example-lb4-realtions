import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TipoPago} from '../models';
import {TipoPagoRepository} from '../repositories';

export class TipoPagoController {
  constructor(
    @repository(TipoPagoRepository)
    public tipoPagoRepository : TipoPagoRepository,
  ) {}

  @post('/tipo-pagos', {
    responses: {
      '200': {
        description: 'TipoPago model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoPago)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoPago, {
            title: 'NewTipoPago',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoPago: Omit<TipoPago, 'id'>,
  ): Promise<TipoPago> {
    return this.tipoPagoRepository.create(tipoPago);
  }

  @get('/tipo-pagos/count', {
    responses: {
      '200': {
        description: 'TipoPago model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TipoPago)) where?: Where<TipoPago>,
  ): Promise<Count> {
    return this.tipoPagoRepository.count(where);
  }

  @get('/tipo-pagos', {
    responses: {
      '200': {
        description: 'Array of TipoPago model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TipoPago, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TipoPago)) filter?: Filter<TipoPago>,
  ): Promise<TipoPago[]> {
    return this.tipoPagoRepository.find(filter);
  }

  @patch('/tipo-pagos', {
    responses: {
      '200': {
        description: 'TipoPago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoPago, {partial: true}),
        },
      },
    })
    tipoPago: TipoPago,
    @param.query.object('where', getWhereSchemaFor(TipoPago)) where?: Where<TipoPago>,
  ): Promise<Count> {
    return this.tipoPagoRepository.updateAll(tipoPago, where);
  }

  @get('/tipo-pagos/{id}', {
    responses: {
      '200': {
        description: 'TipoPago model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoPago, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(TipoPago)) filter?: Filter<TipoPago>
  ): Promise<TipoPago> {
    return this.tipoPagoRepository.findById(id, filter);
  }

  @patch('/tipo-pagos/{id}', {
    responses: {
      '204': {
        description: 'TipoPago PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoPago, {partial: true}),
        },
      },
    })
    tipoPago: TipoPago,
  ): Promise<void> {
    await this.tipoPagoRepository.updateById(id, tipoPago);
  }

  @put('/tipo-pagos/{id}', {
    responses: {
      '204': {
        description: 'TipoPago PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoPago: TipoPago,
  ): Promise<void> {
    await this.tipoPagoRepository.replaceById(id, tipoPago);
  }

  @del('/tipo-pagos/{id}', {
    responses: {
      '204': {
        description: 'TipoPago DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoPagoRepository.deleteById(id);
  }
}
