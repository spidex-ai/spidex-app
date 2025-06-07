import { z } from 'zod';

import type { GetSmartMoneyInflowsInputSchema } from './input-schema';
import type { SolanaActionResult } from '../../solana-action';
import type { SmartMoneyTokenInflow } from '@/services/hellomoon/types';
import type { Price, TokenMetadata } from '@/services/birdeye/types';
import type { TopTokenVolume } from '@/services/taptools/types';
export type GetSmartMoneyInflowsSchemaType =
  typeof GetSmartMoneyInflowsInputSchema;

export type GetSmartMoneyInflowsArgumentsType =
  z.infer<GetSmartMoneyInflowsSchemaType>;

export type GetSmartMoneyInflowsResultBodyType = {
  tokens: TopTokenVolume[];
  message: string;
};

export type GetSmartMoneyInflowsResultType =
  SolanaActionResult<GetSmartMoneyInflowsResultBodyType>;
