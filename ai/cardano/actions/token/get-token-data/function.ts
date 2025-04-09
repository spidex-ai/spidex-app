

import dexHunterService from "@/services/dexhunter";
import type { CardanoActionResult } from "../../cardano-action";
import type { CardanoGetTokenDataArgumentsType, CardanoGetTokenDataResultBodyType } from "./types";
import { searchTokens, getTokenOverview } from "@/services/birdeye";
import { TokenOverview } from "@/services/birdeye/types";

/**
 * Gets the token data for a given ticker.
 *
 * @param connection - The Solana connection instance
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
export async function getTokenData(args: CardanoGetTokenDataArgumentsType): Promise<CardanoActionResult<CardanoGetTokenDataResultBodyType>> {
  try {
    console.log("🚀 ~ getTokenData ~ args:", args)

    const token = {}

    if (!token) {
      return {
        message: `No token found for ${args.search}`,
      };
    }

    return {
      message: `Token data for ${args.search}`,
      body: {
        token: {} as TokenOverview,
      },
    };

  } catch (error) {
    console.error(error);
    return {
      message: `Error getting token data: ${error}`,
    };
  }
}