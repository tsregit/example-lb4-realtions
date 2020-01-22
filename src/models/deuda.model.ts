import { Entity, model, property, belongsTo } from '@loopback/repository';
import { TipoDeuda } from './tipo-deuda.model';

@model({ settings: { strict: false } })
export class Deuda extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  valorTotal: number;

  // Define well-known properties here

  @belongsTo(() => TipoDeuda, { keyTo: 'tipoDeudaId' })
  tipoDeudaId: string;

  constructor(data?: Partial<Deuda>) {
    super(data);
  }
}

export interface DeudaRelations {
  // describe navigational properties here
  tipoDeuda?: TipoDeuda;
}

export type DeudaWithRelations = Deuda & DeudaRelations;
