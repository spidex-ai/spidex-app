import { getTopTraders as getTopTradersBirdeye } from "@/services/birdeye";

import type { GetTopTradersArgumentsType, GetTopTradersResultBodyType } from "./types";
import { SolanaActionResult } from "@/ai/solana/actions/solana-action";
import taptoolsService from "@/services/taptools";

/**
 * Gets the trending tokens from Birdeye API.
 *
 * @param solanaKit - The Solana agent kit instance
 * @param args - The input arguments for the action
 * @returns A message containing the trending tokens information
 */
export async function getTopTraders(
  args: GetTopTradersArgumentsType
): Promise<SolanaActionResult<GetTopTradersResultBodyType>> {
  try {
    const response = await taptoolsService.getTopTokenHolders('8fef2d34078659493ce161a6c7fba4b56afefa8535296a5743f6958741414441', 1, args.limit);
    console.log("🚀 ~ response:", response)

    return {
      message: `Found ${response.length} top traders. The user is shown the traders, do not list them. Ask the user what they want to do with the traders.`,
      body: {
        traders: response,
      }
    };
  } catch (error) {
    return {
      message: `Error getting top traders: ${error}`,
      body: {
        traders: [],
      }
    };
  }
}
