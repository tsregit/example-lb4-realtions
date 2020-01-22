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
import { TipoDeuda } from '../models';
import { TipoDeudaRepository } from '../repositories';

export class TipoDeudaController {
  constructor(
    @repository(TipoDeudaRepository)
    public tipoDeudaRepository: TipoDeudaRepository,
  ) { }

  @post('/tipo-deudas', {
    responses: {
      '200': {
        description: 'TipoDeuda model instance',
        content: { 'application/json': { schema: getModelSchemaRef(TipoDeuda) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoDeuda, {
            title: 'NewTipoDeuda',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoDeuda: Omit<TipoDeuda, 'id'>,
  ): Promise<TipoDeuda> {
    return this.tipoDeudaRepository.create(tipoDeuda);
  }

  @get('/tipo-deudas/count', {
    responses: {
      '200': {
        description: 'TipoDeuda model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TipoDeuda)) where?: Where<TipoDeuda>,
  ): Promise<Count> {
    return this.tipoDeudaRepository.count(where);
  }

  @get('/tipo-deudas', {
    responses: {
      '200': {
        description: 'Array of TipoDeuda model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TipoDeuda, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TipoDeuda)) filter?: Filter<TipoDeuda>,
  ): Promise<TipoDeuda[]> {
    if (filter) {
      filter.include = [{ relation: 'deuda' }];
    }
    return this.tipoDeudaRepository.find(filter);
  }

  @patch('/tipo-deudas', {
    responses: {
      '200': {
        description: 'TipoDeuda PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoDeuda, { partial: true }),
        },
      },
    })
    tipoDeuda: TipoDeuda,
    @param.query.object('where', getWhereSchemaFor(TipoDeuda)) where?: Where<TipoDeuda>,
  ): Promise<Count> {
    return this.tipoDeudaRepository.updateAll(tipoDeuda, where);
  }

  @get('/tipo-deudas/{id}', {
    responses: {
      '200': {
        description: 'TipoDeuda model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoDeuda, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(TipoDeuda)) filter?: Filter<TipoDeuda>
  ): Promise<TipoDeuda> {
    return this.tipoDeudaRepository.findById(id, filter);
  }

  @patch('/tipo-deudas/{id}', {
    responses: {
      '204': {
        description: 'TipoDeuda PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoDeuda, { partial: true }),
        },
      },
    })
    tipoDeuda: TipoDeuda,
  ): Promise<void> {
    await this.tipoDeudaRepository.updateById(id, tipoDeuda);
  }

  @put('/tipo-deudas/{id}', {
    responses: {
      '204': {
        description: 'TipoDeuda PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: string,
    @requestBody() tipoDeuda: TipoDeuda,
  ): Promise<void> {
    await this.tipoDeudaRepository.replaceById(id, tipoDeuda);
  }

  @del('/tipo-deudas/{id}', {
    responses: {
      '204': {
        description: 'TipoDeuda DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.tipoDeudaRepository.deleteById(id);
  }
}
