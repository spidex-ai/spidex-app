import type {
  CardanoTokenHoldersArgumentsType,
  CardanoTokenHoldersResultBodyType,
} from './types';
import type { CardanoActionResult } from '../../cardano-action';
import taptoolsService from '@/services/taptools';

export async function getNumHolders(
  args: CardanoTokenHoldersArgumentsType
): Promise<CardanoActionResult<CardanoTokenHoldersResultBodyType>> {
  try {
    const response = await taptoolsService.getTokenHolders(args.tokenAddress);
    if (!response) {
      throw new Error('Failed to fetch token holders');
    }

    return {
      message: `The number of holders have been retrieved and displayed to the user. Now ask them what they want to do next.`,
      body: {
        numHolders: response.holders,
      },
    };
  } catch (error) {
    return {
      message: `Error getting top holders: ${error}`,
    };
  }
}
