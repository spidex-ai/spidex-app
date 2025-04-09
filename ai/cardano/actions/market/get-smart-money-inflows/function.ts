import type { CardanoGetSmartMoneyInflowsArgumentsType, CardanoGetSmartMoneyInflowsResultBodyType } from "./types";
import type { CardanoActionResult } from "../../cardano-action";
import taptoolsService from "@/services/taptools";
import tokenCardanoService from "@/services/token-cardano";
import { keyBy } from "lodash";


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
    const response = await fetchTopVolumeToken(args.granularity, args.limit)
    console.log("🚀 ~ response:", response)
    return {
      body: {
        tokens: response,
      },
      message: `Found ${response.length} smart money inflows. The user is shown the inflows, do not list them. Ask the user what they want to do next.`,
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

export const fetchTopVolumeToken = async (granularity: string, limit: number) => {
  try {
    const data = await taptoolsService.getTopTokensByVolume(granularity, 1, limit);
    const tokenIds = data.map((token) => token.unit);
    const [tokenDetails, tokenPrices] = await Promise.all([
      tokenCardanoService.batchTokenInfo(tokenIds, ['logo']),
      Promise.all(tokenIds.map(async (token) => {
        const tokenPrice = await taptoolsService.getTokenQuote(token, 'USD');
        return {
          unit: token,
          price: tokenPrice.price
        };
      }))
    ]);

    const mapTokenWithPrices = keyBy(tokenPrices, 'unit');

    const mapTokenWithDetails = keyBy(tokenDetails.subjects, 'subject');
    const tokens = data.map((token) => {
      const tokenDetail = mapTokenWithDetails[token.unit];
      return {
        ...token,
        logo: tokenDetail?.logo.value,
        usdPrice: mapTokenWithPrices[token.unit]?.price
      };
    });
    return tokens;
  } catch (error) {
    console.error('Error fetching top token mcap:', error);
    return [];
  }
}