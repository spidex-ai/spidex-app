import { searchTokens } from "@/services/birdeye";

import type { CardanoActionResult } from "../../cardano-action";
import type { CardanoGetTokenAddressArgumentsType, CardanoGetTokenAddressResultBodyType } from "./types";
import { SearchTokenInfo } from "@/services/dexhunter/types";
import dexHunterService from "@/services/dexhunter";

/**
 * Gets the token data for a given ticker.
 *
 * @param connection - The Solana connection instance
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
export async function getTokenAddress(args: CardanoGetTokenAddressArgumentsType): Promise<CardanoActionResult<CardanoGetTokenAddressResultBodyType>> {
  console.log("🚀 ~ getTokenAddress ~ args:", args)
  try {
    const response = await dexHunterService.searchToken(args.keyword, true, 0, 1);
    console.log("🚀 ~ getTokenAddress ~ response:", response)
    if (!response) {
      throw new Error("Failed to fetch search results");
    }

    return {
      message: `Found token address for ${args.keyword}. The user is shown the following token address in the UI, DO NOT REITERATE THE TOKEN ADDRESS. Ask the user what they want to do next.`,
      body: {
        address: response[0]?.token_id,
      }
    }
  } catch (error) {
    return {
      message: `Error getting token data: ${error}`,
    };
  }
}