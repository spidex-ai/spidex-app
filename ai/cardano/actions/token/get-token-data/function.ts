

import type { CardanoActionResult } from "../../cardano-action";
import type { CardanoGetTokenDataArgumentsType, CardanoGetTokenDataResultBodyType } from "./types";
import { searchTokens, getTokenOverview } from "@/services/birdeye";

/**
 * Gets the token data for a given ticker.
 *
 * @param connection - The Solana connection instance
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
  export async function getTokenData(args: CardanoGetTokenDataArgumentsType): Promise<CardanoActionResult<CardanoGetTokenDataResultBodyType>> {
  try {

    const { items } = await searchTokens({ keyword: args.search });

    const token = items?.[0]?.result?.[0];

    if (!token) {
      return {
        message: `No token found for ${args.search}`,
      };
    }

    return {
        message: `Token data for ${args.search}`,
        body: {
            token: await getTokenOverview(token.address),
        },
    };

  } catch (error) {
    console.error(error);
    return {
      message: `Error getting token data: ${error}`,
    };
  }
}