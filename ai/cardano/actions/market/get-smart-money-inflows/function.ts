import type {
  CardanoGetSmartMoneyInflowsArgumentsType,
  CardanoGetSmartMoneyInflowsResultBodyType,
} from './types';
import type { CardanoActionResult } from '../../cardano-action'
import coreService from '@/services/core';


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

