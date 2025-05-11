import dexHunterService from "@/services/dexhunter";
import type { CardanoActionResult } from "../../cardano-action";
import type {
  CardanoGetTokenDataArgumentsType,
  CardanoGetTokenDataResultBodyType,
} from "./types";
import taptoolsService from "@/services/taptools";
import { TokenDetail, TokenStats } from "@/services/taptools/types";
import tokenCardanoService from "@/services/token-cardano";
import s3Service from "@/services/s3";

/**
 * Gets the token data for a given ticker.
 *
 * @param connection - The Solana connection instance
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
export async function getTokenData(
  args: CardanoGetTokenDataArgumentsType
): Promise<CardanoActionResult<CardanoGetTokenDataResultBodyType>> {
  try {
    const response = await dexHunterService.searchToken(
      args.search,
      true,
      0,
      1
    );
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
      tokenDetail,
      usdPrice,
      mcap,
      holders,
      tradingStats,
      tokenPriceChange,
      tokenLinks,
    ] = await Promise.all([
      tokenCardanoService.tokenInfo(tokenAddress),
      taptoolsService.getTokenQuote(tokenAddress, "USD"),
      taptoolsService.getTokenMcap(tokenAddress),
      taptoolsService.getTokenHolders(tokenAddress),
      taptoolsService.getTokenTradingStats(tokenAddress, "24H"),
      taptoolsService.getTokenPriceChanges(tokenAddress),
      taptoolsService.getTokenLinks(tokenAddress),
    ]);
    let tokenLogo: string;
    const existedKey = await s3Service.keyExists(`${response[0].ticker}.png`);
    if (existedKey) {
      tokenLogo = encodeURI(`${process.env.S3_URL}/${response[0].ticker}.png`);
    } else {
      tokenLogo = await s3Service.uploadBase64Image(
        tokenDetail.logo.value,
        `${response[0].ticker}.png`
      );
    }
    const tokenStats: TokenStats = {
      price: mcap.price,
      usdPrice: usdPrice.price,
      mcap,
      holders: holders.holders,
      "24h": tradingStats,
      tokenAddress,
      tokenLogo,
      tokenPriceChange,
      tokenLinks,
    };

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
