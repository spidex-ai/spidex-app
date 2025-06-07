import type {
  CardanoGetTraderTradesArgumentsType,
  CardanoGetTraderTradesResultBodyType,
} from './types';

import taptoolsService from '@/services/taptools';
import { CardanoActionResult } from '../../cardano-action';

/**
 * Gets the trending tokens from Birdeye API.
 *
 * @param cardanoKit - The Cardano agent kit instance
 * @param args - The input arguments for the action
 * @returns A message containing the trending tokens information
 */
export async function getTraderTrades(
  args: CardanoGetTraderTradesArgumentsType
): Promise<CardanoActionResult<CardanoGetTraderTradesResultBodyType>> {
  try {
    const response = await taptoolsService.getWalletTokenTrades(
      args.address,
      undefined,
      1,
      args.limit
    );

    return {
      message: `Found ${response.length} trades for the trader. The user is shown the trades, do not list them. Ask the user what they want to do with the trades.`,
      body: {
        tokensTraded: response,
      },
    };
  } catch (error) {
    return {
      message: `Error getting trades for the trader: ${error}`,
      body: {
        tokensTraded: [],
      },
    };
  }
}
