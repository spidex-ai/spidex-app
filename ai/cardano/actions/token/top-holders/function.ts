import type {
  CardanoTopHoldersArgumentsType,
  CardanoTopHoldersResultBodyType,
} from './types';
import type { CardanoActionResult } from '../../cardano-action';
import taptoolsService from '@/services/taptools';
import { coreService } from '@/services/core';

export async function getTopHolders(
  args: CardanoTopHoldersArgumentsType
): Promise<CardanoActionResult<CardanoTopHoldersResultBodyType>> {
  try {
    let topHolders = await coreService.getTokenTopHolders(
      args.tokenAddress,
      args.limit,      
    );

    if (!topHolders || topHolders.length === 0) {
      throw new Error('Failed to fetch top holders');
    }
    const mintInfo = await taptoolsService.getTokenMcap(args.tokenAddress);
    const totalSupply = Number(BigInt(mintInfo.totalSupply));

    return {
      message: `The top holders have been retrieved and displayed to the user. Now ask them what they want to do next.`,
      body: {
        topHolders: await Promise.all(
          topHolders.map(async holder => {
            return {
              ...holder,
              percentageOwned: (holder.amount / totalSupply) * 100,
            };
          })
        ),
        percentageOwned:
          topHolders.reduce((acc, holder) => acc + Number(holder.amount), 0) /
          totalSupply,
      },
    };
  } catch (error) {
    return {
      message: `Error getting top holders: ${error}`,
    };
  }
}
