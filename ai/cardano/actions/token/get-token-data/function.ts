

import dexHunterService from "@/services/dexhunter";
import type { CardanoActionResult } from "../../cardano-action";
import type { CardanoGetTokenDataArgumentsType, CardanoGetTokenDataResultBodyType } from "./types";
import taptoolsService from "@/services/taptools";

/**
 * Gets the token data for a given ticker.
 *
 * @param connection - The Solana connection instance
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
export async function getTokenData(args: CardanoGetTokenDataArgumentsType): Promise<CardanoActionResult<CardanoGetTokenDataResultBodyType>> {
  try {
    const response = await dexHunterService.searchToken(args.search, true, 0, 1);
    if (!response) {
      throw new Error("Failed to fetch search results");
    }

    const tokenAddress = response[0]?.token_id;
    if (!tokenAddress) {
      return {
        message: `No token found for ${args.search}`,
      };
    }
    const [
      usdPrice,
      mcap,
      holders,
      tradingStats
    ] = await Promise.all([
      taptoolsService.getTokenQuote(tokenAddress, 'USD'),
      taptoolsService.getTokenMcap(tokenAddress),
      taptoolsService.getTokenHolders(tokenAddress),
      taptoolsService.getTokenTradingStats(tokenAddress, '24H')
    ]);

    const tokenStats = {
      price: mcap.price,
      usdPrice: usdPrice.price,
      mcap,
      holders: holders.holders,
      "24h": tradingStats
    }
    console.log("🚀 ~ getTokenData ~ tokenStats:", tokenStats)



    return {
      message: `Token data for ${args.search}`,
      body: {
        token: tokenStats as any,
      },
    };

  } catch (error) {
    console.error(error);
    return {
      message: `Error getting token data: ${error}`,
    };
  }
}