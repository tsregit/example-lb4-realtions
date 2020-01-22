import { Entity, model, property, belongsTo } from '@loopback/repository';
import { TipoDeuda } from './tipo-deuda.model';
import { Dueno } from './dueno.model';
import {Pago} from './pago.model';

@model({settings: {strict: false}})
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


  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'date-time'
    },
  })
  fechaCaducada: number;

  @property({
    type: 'boolean',
    required: true,
  })
  estadoNotificacion: boolean;


  @belongsTo(() => Dueno)
  duenoId: string;

  @belongsTo(() => TipoDeuda, {keyTo: 'tipoDeudaId'})
  tipoDeudaId: string;

  @belongsTo(() => Pago)
  pagoId: string;

  constructor(data?: Partial<Deuda>) {
    super(data);
  }
}

export interface DeudaRelations {
  // describe navigational properties here
  tipoDeuda?: TipoDeuda;
}

export type DeudaWithRelations = Deuda & DeudaRelations;
