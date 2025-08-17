import type {
  CardanoGetSmartMoneyInflowsArgumentsType,
  CardanoGetSmartMoneyInflowsResultBodyType,
} from './types';
import type { CardanoActionResult } from '../../cardano-action';
import taptoolsService from '@/services/taptools';
import tokenCardanoService from '@/services/token-cardano';
import { keyBy } from 'lodash';
import s3Service from '@/services/s3';
import coreService from '@/services/core';

/**
 * Gets the trending tokens from Birdeye API.
 *
 * @param solanaKit - The Solana agent kit instance
 * @param args - The input arguments for the action
 * @returns A message containing the trending tokens information
 */
export async function getSmartMoneyInflows(
  args: CardanoGetSmartMoneyInflowsArgumentsType
): Promise<CardanoActionResult<CardanoGetSmartMoneyInflowsResultBodyType>> {
  try {
    const response = await coreService.getTopTokensByVolume(1, args.limit);

    return {
      body: {
        tokens: response,
      },
      message: `Found ${response.length} smart money inflows. The user is shown the inflows, do not list them. Ask the user what they want to do next.`,
    };
  } catch (error) {
    return {
      message: `Error getting trending tokens: ${error}`,
      body: {
        tokens: [],
      },
    };
  }
}

