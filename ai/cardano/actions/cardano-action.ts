
import {
  BaseAction,
  BaseActionResult,
  BaseActionSchemaAny,
} from '../../base-action';

export type CardanoActionSchemaAny = BaseActionSchemaAny;
export type CardanoActionResult<TBody> = BaseActionResult<TBody>;

export interface CardanoAction<
  TActionSchema extends CardanoActionSchemaAny,
  TBody,
> extends BaseAction<TActionSchema, TBody, any> {}
