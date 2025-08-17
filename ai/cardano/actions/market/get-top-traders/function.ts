

import type {
  CardanoGetTopTradersArgumentsType,
  CardanoGetTopTradersResultBodyType,
} from './types';
import { CardanoActionResult } from '@/ai/cardano/actions/cardano-action';
import coreService from '@/services/core';


export async function getTopTraders(
  args: CardanoGetTopTradersArgumentsType
): Promise<CardanoActionResult<CardanoGetTopTradersResultBodyType>> {
  try {
    const response = await coreService.getTopTokenTraders(
      args.address || '8fef2d34078659493ce161a6c7fba4b56afefa8535296a5743f6958741414441',
      1,
      args.limit
    );

    return {
      message: `Found ${response.length} top traders. The user is shown the traders, do not list them. Ask the user what they want to do with the traders.`,
      body: {
        traders: response,
      },
    };
  } catch (error) {
    return {
      message: `Error getting top traders: ${error}`,
      body: {
        traders: [],
      },
    };
  }
}
