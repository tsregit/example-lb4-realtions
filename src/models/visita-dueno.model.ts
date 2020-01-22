import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class VisitaDueno extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaVisita: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estadoNotificacion: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<VisitaDueno>) {
    super(data);
  }
}

export interface VisitaDuenoRelations {
  // describe navigational properties here
}

export type VisitaDuenoWithRelations = VisitaDueno & VisitaDuenoRelations;
