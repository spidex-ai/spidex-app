import { TokenPriceChartResultBodyType } from "@/ai/solana";
import { CardanoActionResult } from "../../cardano-action";

export async function getPriceChart(): Promise<CardanoActionResult<TokenPriceChartResultBodyType>> {
  try {
    return {
      message: `The price chart has been retrieved and displayed to the user. Do not reiterate the raw data.`,
      body: {}
    };
  } catch (error) {
    return {
      message: `Error getting top holders: ${error}`,
    };
  }
} 