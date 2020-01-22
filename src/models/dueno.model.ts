import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Dueno extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 30
    },
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 30
    },
  })
  apellidoP: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 30
    },
  })
  apellidoM: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 50
    },
  })
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Dueno>) {
    super(data);
  }
}

export interface DuenoRelations {
  // describe navigational properties here
}

export type DuenoWithRelations = Dueno & DuenoRelations;
