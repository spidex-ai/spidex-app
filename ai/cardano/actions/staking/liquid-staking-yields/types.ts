import { z } from 'zod';

import { LiquidStakingYieldsInputSchema } from './input-schema';

import type { CardanoActionResult } from '../../cardano-action';
import type { Token } from '@/db/types';

export type CardanoLiquidStakingYieldsSchemaType =
  typeof LiquidStakingYieldsInputSchema;

export type CardanoLiquidStakingYieldsArgumentsType =
  z.infer<CardanoLiquidStakingYieldsSchemaType>;

export type CardanoLiquidStakingYieldsResultBodyType = {
  name: string;
  yield: number;
  tokenData: Token;
}[];

export type CardanoLiquidStakingYieldsResultType =
  CardanoActionResult<CardanoLiquidStakingYieldsResultBodyType>;
