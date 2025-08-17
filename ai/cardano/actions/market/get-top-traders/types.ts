import { z } from 'zod';

import type { GetTopTradersInputSchema } from './input-schema';
import { CardanoActionResult } from '@/ai/cardano/actions/cardano-action';
import { TokenHolder } from '@/services/taptools/types';

export type CardanoGetTopTradersSchemaType = typeof GetTopTradersInputSchema;

export type CardanoGetTopTradersArgumentsType =
  z.infer<CardanoGetTopTradersSchemaType>;

export type CardanoGetTopTradersResultBodyType = {
  traders: TokenHolder[];
};

export type CardanoGetTopTradersResultType =
  CardanoActionResult<CardanoGetTopTradersResultBodyType>;
