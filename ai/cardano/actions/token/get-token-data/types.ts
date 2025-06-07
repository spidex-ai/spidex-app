import { z } from 'zod';

import { GetTokenDataInputSchema } from './input-schema';

import type { CardanoActionResult } from '../../cardano-action';
import type { TokenOverview } from '@/services/birdeye/types';

export type CardanoGetTokenDataSchemaType = typeof GetTokenDataInputSchema;

export type CardanoGetTokenDataArgumentsType =
  z.infer<CardanoGetTokenDataSchemaType>;

export type CardanoGetTokenDataResultBodyType = {
  token: TokenOverview;
};

export type CardanoGetTokenDataResultType =
  CardanoActionResult<CardanoGetTokenDataResultBodyType>;
