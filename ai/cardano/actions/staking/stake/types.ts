import { z } from 'zod';
import { StakeInputSchema } from './input-schema';
import { CardanoActionResult } from '../../cardano-action';

export type CardanoStakeSchemaType = typeof StakeInputSchema;

export type CardanoStakeArgumentsType = z.infer<CardanoStakeSchemaType>;

export type CardanoStakeResultBodyType = {
  tx: string;
  symbol: string;
};

export type CardanoStakeResultType =
  CardanoActionResult<CardanoStakeResultBodyType>;
