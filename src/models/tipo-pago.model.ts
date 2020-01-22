import { Entity, model, property } from '@loopback/repository';


@model({ settings: { strict: false } })
export class TipoPago extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 30
    },
  })
  descripcion: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TipoPago>) {
    super(data);
  }
}

export interface TipoPagoRelations {
  // describe navigational properties here
}

export type TipoPagoWithRelations = TipoPago & TipoPagoRelations;
