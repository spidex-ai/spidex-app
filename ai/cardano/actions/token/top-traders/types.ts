import { z } from 'zod';

import { TopTokenTradersInputSchema } from './input-schema';
import { CardanoActionResult } from '../../cardano-action';

import type { TopTraderByToken } from '@/services/birdeye/types';

export type CardanoTopTokenTradersSchemaType =
  typeof TopTokenTradersInputSchema;

export type CardanoTopTokenTradersArgumentsType =
  z.infer<CardanoTopTokenTradersSchemaType>;

export type CardanoTopTokenTradersResultBodyType = {
  topTraders: TopTraderByToken[];
};

export type CardanoTopTokenTradersResultType =
  CardanoActionResult<CardanoTopTokenTradersResultBodyType>;
