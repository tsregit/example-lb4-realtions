import { Entity, model, property, hasOne } from '@loopback/repository';
import { Deuda } from './deuda.model';

@model({ settings: { strict: false } })
export class TipoDeuda extends Entity {
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
  descripcion: string;

  // Define well-known properties here

  @hasOne(() => Deuda)
  deuda?: Deuda;

  constructor(data?: Partial<TipoDeuda>) {
    super(data);
  }
}

export interface TipoDeudaRelations {
  // describe navigational properties here
  deuda?: Deuda;
}

export type TipoDeudaWithRelations = TipoDeuda & TipoDeudaRelations;
