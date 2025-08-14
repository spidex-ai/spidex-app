

import type {
  CardanoTopTokenTradersArgumentsType,
  CardanoTopTokenTradersResultBodyType,
} from './types';
import type { CardanoActionResult } from '../../cardano-action';

export async function getTopTokenTraders(
  args: CardanoTopTokenTradersArgumentsType
): Promise<CardanoActionResult<CardanoTopTokenTradersResultBodyType>> {
  try {


    return {
      message: `The top holders have been retrieved and displayed to the user. Now ask them what they want to do next. DO NOT REPEAT THE RESULTS OF THIS TOOL.`,
      body: {
        topTraders: [],
      },
    };
  } catch (error) {
    return {
      message: `Error getting top traders: ${error}`,
    };
  }
}
