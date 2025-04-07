import { seekTradesByTime } from "@/services/birdeye";

import type { CardanoGetTraderTradesArgumentsType, CardanoGetTraderTradesResultBodyType } from "./types";
import { getToken } from "@/db/services";
import { Token } from "@/db/types";
import taptoolsService from "@/services/taptools";
import { CardanoActionResult } from "../../cardano-action";

/**
 * Gets the trending tokens from Birdeye API.
 *
 * @param solanaKit - The Solana agent kit instance
 * @param args - The input arguments for the action
 * @returns A message containing the trending tokens information
 */
export async function getTraderTrades(
  args: CardanoGetTraderTradesArgumentsType
): Promise<CardanoActionResult<CardanoGetTraderTradesResultBodyType>> {
  try {
    // const responses = await Promise.all(
    //   Array.from({ length: 10 }, (_, i) => 
    //     seekTradesByTime({
    //       address: args.address,
    //       offset: i * 100,
    //       limit: 100
    //     })
    //   )
    // );
    // const response = {
    //   items: responses.flatMap(r => r.items)
    // };

    // const tokensTradedData: Record<string, Omit<TokenTraded, "token">> = {};

    // // Helper function to update token data
    // const updateTokenData = (tokenAddress: string, trade: { ui_change_amount: number, nearest_price: number }) => {
    //   const amount = trade.ui_change_amount;
    //   const absoluteAmount = Math.abs(amount);
    //   const value = absoluteAmount * (trade.nearest_price || 0);

    //   if (tokensTradedData[tokenAddress]) {
    //     // Update existing token data
    //     tokensTradedData[tokenAddress].volume.buy += amount > 0 ? value : 0;
    //     tokensTradedData[tokenAddress].volume.sell += amount < 0 ? value : 0;
    //     tokensTradedData[tokenAddress].balanceChange += amount;
    //     tokensTradedData[tokenAddress].usdChange += amount * trade.nearest_price;
    //   } else {
    //     // Create new token data
    //     tokensTradedData[tokenAddress] = {
    //       volume: {
    //         buy: amount > 0 ? value : 0,
    //         sell: amount < 0 ? value : 0,
    //       },
    //       balanceChange: amount,
    //       usdChange: amount * (trade.nearest_price || 0),
    //     };
    //   }
    // };

    // response.items.forEach((trade) => {
    //   // Handle quote token
    //   updateTokenData(trade.quote.address, trade.quote);

    //   // Handle base token
    //   updateTokenData(trade.base.address, trade.base);
    // });

    // const tokensTraded = (await Promise.all(Object.entries(tokensTradedData).map(async ([address, data]) => {
    //   const token = await getToken(address) as Token;
    //   // Skip tokens that weren't found in the database
    //   if (!token) return null;
    //   return {
    //     token,
    //     ...data,
    //   };
    // })))
    // .filter((item): item is TokenTraded => item !== null) // Filter out null values
    // .reduce((acc, curr) => {
    //   acc[curr.token.id] = curr;
    //   return acc;
    // }, {} as Record<string, TokenTraded>);

    const response = await taptoolsService.getWalletTokenTrades(args.address, undefined, 1, args.limit);
    console.log("🚀 ~ response:", response)
    return {
      message: `Found ${response.length} trades for the trader. The user is shown the trades, do not list them. Ask the user what they want to do with the trades.`,
      body: {
        tokensTraded: response,
      }
    };
  } catch (error) {
    return {
      message: `Error getting trades for the trader: ${error}`,
      body: {
        tokensTraded: [],
      }
    };
  }
}
