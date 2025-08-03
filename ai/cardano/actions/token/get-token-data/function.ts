import type { CardanoActionResult } from '../../cardano-action';
import type {
  CardanoGetTokenDataArgumentsType,
  CardanoGetTokenDataResultBodyType,
} from './types';
import { TokenStats } from '@/services/taptools/types';

import coreService from '@/services/core';

/**
 * Gets the token data for a given ticker.
 *
 * @param connection - The Solana connection instance
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
export async function getTokenData(
  args: CardanoGetTokenDataArgumentsType
): Promise<CardanoActionResult<CardanoGetTokenDataResultBodyType>> {
  console.log('🚀 ~ args:', args);
  try {
    let tokenAddress = null;
    if (
      args.search.toLowerCase() == 'ada' ||
      args.search.toLowerCase() == 'cardano' ||
      args.search.toLowerCase() == 'cardano (ada)'
    ) {
      const tokenDetail = await coreService.getTokenDetail('ADA');
      const stats = await coreService.getTokenStats('ADA');

      const tokenStats: TokenStats = {
        price: stats.price,
        usdPrice: stats.usdPrice,
        mcap: stats.mcap,
        holders: stats.holders,
        tokenAddress: 'lovelace',
        '24h': stats['24h'],
        tokenLogo: tokenDetail.logo,
        tokenLinks: stats.tokenLinks,
      };

      console.log('🚀 ~ tokenStats:', tokenStats);

      return {
        message: `Token data for ${args.search}`,
        body: {
          token: tokenStats as any,
        },
      };
    } else {
      const response = await coreService.searchToken(args.search, 10, 1, true);
      if (!response) {
        throw new Error('Failed to fetch search results');
      }

      // Find the first token that matches the search
      let token = response.find(
        token =>
          token.name?.toLowerCase() === args.search.toLowerCase() ||
          token.ticker.toLowerCase() === args.search.toLowerCase()
      );

      if (!token) {
        token = response.find(
          token =>
            token.name?.toLowerCase().includes(args.search.toLowerCase()) ||
            token.ticker.toLowerCase().includes(args.search.toLowerCase())
        );
      }

      if (!token) {
        return {
          message: `No token found for ${args.search}`,
        };
      }

      tokenAddress = token.token_id;

      const stats = await coreService.getTokenStats(tokenAddress);
      console.log('🚀 ~ stats:', stats);

      const tokenDetail = await coreService.getTokenDetail(tokenAddress);

      const tokenStats: TokenStats = {
        price: tokenDetail.price,
        usdPrice: tokenDetail.usdPrice || 0,
        mcap: stats.mcap,
        holders: stats.holders,
        '24h': stats['24h'],
        tokenAddress,
        tokenLogo: tokenDetail.logo,
        tokenPriceChange: stats.tokenPriceChange,
        tokenLinks: stats.tokenLinks,
      };

      return {
        message: `Token data for ${args.search}`,
        body: {
          token: tokenStats as any,
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: `Error getting token data: ${error}`,
    };
  }
}
