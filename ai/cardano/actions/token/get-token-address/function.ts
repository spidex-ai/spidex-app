import { searchTokens } from "@/services/birdeye";

import type { CardanoActionResult } from "../../cardano-action";
import type {
  CardanoGetTokenAddressArgumentsType,
  CardanoGetTokenAddressResultBodyType,
} from "./types";
import { SearchTokenInfo } from "@/services/dexhunter/types";
import dexHunterService from "@/services/dexhunter";

/**
 * Gets the token data for a given ticker.
 *
 * @param connection - The Solana connection instance
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
export async function getTokenAddress(
  args: CardanoGetTokenAddressArgumentsType
): Promise<CardanoActionResult<CardanoGetTokenAddressResultBodyType>> {
  // Check if keyword matches any known ticker
  const localMatch = knownTokens.find(
    (token) => token.ticker.toLowerCase() === args.keyword.toLowerCase()
  );

  if (localMatch) {
    return {
      message: `Found token address for ${args.keyword}. The user is shown the following token address in the UI, DO NOT REITERATE THE TOKEN ADDRESS. Ask the user what they want to do next.`,
      body: {
        address: localMatch.unit,
      },
    };
  }
  try {
    const response = await dexHunterService.searchToken(
      args.keyword,
      true,
      0,
      1
    );
    if (!response) {
      throw new Error("Failed to fetch search results");
    }

    return {
      message: `Found token address for ${args.keyword}. The user is shown the following token address in the UI, DO NOT REITERATE THE TOKEN ADDRESS. Ask the user what they want to do next.`,
      body: {
        address: response[0]?.token_id,
      },
    };
  } catch (error) {
    return {
      message: `Error getting token data: ${error}`,
    };
  }
}

const knownTokens = [
  {
    ticker: "ADA",
    unit: "",
  },
  {
    ticker: "SNEK",
    unit: "279c909f348e533da5808898f87f9a14bb2c3dfbbacccd631d927a3f534e454b",
  },
  {
    ticker: "WMTX",
    unit: "e5a42a1a1d3d1da71b0449663c32798725888d2eb0843c4dabeca05a576f726c644d6f62696c65546f6b656e58",
  },
  {
    ticker: "IAG",
    unit: "5d16cc1a177b5d9ba9cfa9793b07e60f1fb70fea1f8aef064415d114494147",
  },
  {
    ticker: "AGIX",
    unit: "f43a62fdc3965df486de8a0d32fe800963589c41b38946602a0dc53541474958",
  },
  {
    ticker: "LQ",
    unit: "da8c30857834c6ae7203935b89278c532b3995245295456f993e1d244c51",
  },
  {
    ticker: "MIN",
    unit: "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c64d494e",
  },
  {
    ticker: "SHEN",
    unit: "8db269c3ec630e06ae29f74bc39edd1f87c819f1056206e879a1cd615368656e4d6963726f555344",
  },
  {
    ticker: "HOSKY",
    unit: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235484f534b59",
  },
  {
    ticker: "NVL",
    unit: "5b26e685cc5c9ad630bde3e3cd48c694436671f3d25df53777ca60ef4e564c",
  },
  {
    ticker: "INDY",
    unit: "533bb94a8850ee3ccbe483106489399112b74c905342cb1792a797a0494e4459",
  },
];
