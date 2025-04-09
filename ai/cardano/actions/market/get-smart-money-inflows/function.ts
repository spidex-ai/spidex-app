import type { CardanoGetSmartMoneyInflowsArgumentsType, CardanoGetSmartMoneyInflowsResultBodyType } from "./types";
import type { CardanoActionResult } from "../../cardano-action"; 


/**
 * Gets the trending tokens from Birdeye API.
 *
 * @param solanaKit - The Solana agent kit instance
 * @param args - The input arguments for the action
 * @returns A message containing the trending tokens information
 */
export async function getSmartMoneyInflows(
  args: CardanoGetSmartMoneyInflowsArgumentsType
): Promise<CardanoActionResult<CardanoGetSmartMoneyInflowsResultBodyType>> {
  try {

    console.log("🚀 ~ getSmartMoneyInflows ~ args:", args)
 
    return {
      body: {
        tokens: [],
      },
      message: `Found ${0} smart money inflows. The user is shown the inflows, do not list them. Ask the user what they want to do next.`,
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
