import { z } from 'zod';

import type { GetTrendingTokensInputSchema } from './input-schema';
import { CardanoActionResult } from '@/ai/cardano/actions/cardano-action';
import { TopTokenMcap } from '@/services/taptools/types';

export type CardanoGetTrendingTokensSchemaType =
  typeof GetTrendingTokensInputSchema;

export type CardanoGetTrendingTokensArgumentsType =
  z.infer<CardanoGetTrendingTokensSchemaType>;

export type CardanoGetTrendingTokensResultBodyType = {
  tokens: TopTokenMcap[];
};

export type CardanoGetTrendingTokensResultType =
  CardanoActionResult<CardanoGetTrendingTokensResultBodyType>;
