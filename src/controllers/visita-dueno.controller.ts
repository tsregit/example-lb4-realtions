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
import {VisitaDueno} from '../models';
import {VisitaDuenoRepository} from '../repositories';

export class VisitaDuenoController {
  constructor(
    @repository(VisitaDuenoRepository)
    public visitaDuenoRepository : VisitaDuenoRepository,
  ) {}

  @post('/visita-duenos', {
    responses: {
      '200': {
        description: 'VisitaDueno model instance',
        content: {'application/json': {schema: getModelSchemaRef(VisitaDueno)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaDueno, {
            title: 'NewVisitaDueno',
            exclude: ['id'],
          }),
        },
      },
    })
    visitaDueno: Omit<VisitaDueno, 'id'>,
  ): Promise<VisitaDueno> {
    return this.visitaDuenoRepository.create(visitaDueno);
  }

  @get('/visita-duenos/count', {
    responses: {
      '200': {
        description: 'VisitaDueno model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(VisitaDueno)) where?: Where<VisitaDueno>,
  ): Promise<Count> {
    return this.visitaDuenoRepository.count(where);
  }

  @get('/visita-duenos', {
    responses: {
      '200': {
        description: 'Array of VisitaDueno model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(VisitaDueno, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(VisitaDueno)) filter?: Filter<VisitaDueno>,
  ): Promise<VisitaDueno[]> {
    return this.visitaDuenoRepository.find(filter);
  }

  @patch('/visita-duenos', {
    responses: {
      '200': {
        description: 'VisitaDueno PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaDueno, {partial: true}),
        },
      },
    })
    visitaDueno: VisitaDueno,
    @param.query.object('where', getWhereSchemaFor(VisitaDueno)) where?: Where<VisitaDueno>,
  ): Promise<Count> {
    return this.visitaDuenoRepository.updateAll(visitaDueno, where);
  }

  @get('/visita-duenos/{id}', {
    responses: {
      '200': {
        description: 'VisitaDueno model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(VisitaDueno, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(VisitaDueno)) filter?: Filter<VisitaDueno>
  ): Promise<VisitaDueno> {
    return this.visitaDuenoRepository.findById(id, filter);
  }

  @patch('/visita-duenos/{id}', {
    responses: {
      '204': {
        description: 'VisitaDueno PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaDueno, {partial: true}),
        },
      },
    })
    visitaDueno: VisitaDueno,
  ): Promise<void> {
    await this.visitaDuenoRepository.updateById(id, visitaDueno);
  }

  @put('/visita-duenos/{id}', {
    responses: {
      '204': {
        description: 'VisitaDueno PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() visitaDueno: VisitaDueno,
  ): Promise<void> {
    await this.visitaDuenoRepository.replaceById(id, visitaDueno);
  }

  @del('/visita-duenos/{id}', {
    responses: {
      '204': {
        description: 'VisitaDueno DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.visitaDuenoRepository.deleteById(id);
  }
}
