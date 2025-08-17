import { z } from 'zod';

import type { GetTraderTradesInputSchema } from './input-schema';
import type { CardanoActionResult } from '../../cardano-action';
import { WalletTradeToken } from '@/services/taptools/types';

// export type CardanoTokenTraded extends WalletTradeToken {
//     token: Token;
//     volume: {
//         buy: number;
//         sell: number;
//     },
//     balanceChange: number;
//     usdChange: number;
// }

export type CardanoGetTraderTradesSchemaType =
  typeof GetTraderTradesInputSchema;

export type CardanoGetTraderTradesArgumentsType =
  z.infer<CardanoGetTraderTradesSchemaType>;

export type CardanoGetTraderTradesResultBodyType = {
  tokensTraded: WalletTradeToken[];
};

export type CardanoGetTraderTradesResultType =
  CardanoActionResult<CardanoGetTraderTradesResultBodyType>;
