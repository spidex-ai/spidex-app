import { Connection } from '@solana/web3.js';
import {
  BaseAction,
  BaseActionResult,
  BaseActionSchemaAny,
} from '../../base-action';

export type CardanoActionSchemaAny = BaseActionSchemaAny;
export type CardanoActionResult<TBody> = BaseActionResult<TBody>;

/**
 * Represents the structure for Solana Actions.
 */

export interface CardanoAction<
  TActionSchema extends CardanoActionSchemaAny,
  TBody,
> extends BaseAction<TActionSchema, TBody, Connection> {}
