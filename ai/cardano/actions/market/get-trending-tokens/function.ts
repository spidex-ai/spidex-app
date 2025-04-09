import taptoolsService from "@/services/taptools";

import type { CardanoGetTrendingTokensArgumentsType, CardanoGetTrendingTokensResultBodyType } from "./types";
import { CardanoActionResult } from "@/ai/cardano/actions/cardano-action";

/**
 * Gets the trending tokens from Birdeye API.
 *
 * @param solanaKit - The Solana agent kit instance
 * @param args - The input arguments for the action
 * @returns A message containing the trending tokens information
 */
export async function getTrendingTokens(
  args: CardanoGetTrendingTokensArgumentsType
): Promise<CardanoActionResult<CardanoGetTrendingTokensResultBodyType>> {
  try {
    const response = await taptoolsService.getTopTokensByMcap(1, args.limit);
    console.log("🚀 ~ getTopTokensByMcap:", response)

    return {
      message: `Found ${response.length} trending tokens. The user is shown the tokens, do not list them. Ask the user what they want to do with the coin.`,
      body: {
        tokens: response,
      }
    };
  } catch (error) {
    return {
      message: `Error getting trending tokens: ${error}`,
      body: {
        tokens: [],
      }
    };
  }
}
