import { searchTokens } from "@/services/birdeye";

import type { CardanoActionResult } from "../../cardano-action";
import type { CardanoGetTokenAddressArgumentsType, CardanoGetTokenAddressResultBodyType } from "./types";
import { SearchTokenInfo } from "@/services/dexhunter/types";

/**
 * Gets the token data for a given ticker.
 *
 * @param connection - The Solana connection instance
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
export async function getTokenAddress(args: CardanoGetTokenAddressArgumentsType): Promise<CardanoActionResult<CardanoGetTokenAddressResultBodyType>> {
  try {
    const response = await fetch(
      `/api/tokens/search?query=${encodeURIComponent(
        args.keyword
      )}&verified=true`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }
    const data: SearchTokenInfo[] = await response.json();

    const tokenAddress = data[0]?.token_id;

    if (!tokenAddress) {
      throw new Error('Failed to fetch token address');
    }

    return {
      message: `Found token address for ${args.keyword}. The user is shown the following token address in the UI, DO NOT REITERATE THE TOKEN ADDRESS. Ask the user what they want to do next.`,
      body: {
        address: tokenAddress,
      }
    }
  } catch (error) {
    return {
      message: `Error getting token data: ${error}`,
    };
  }
}