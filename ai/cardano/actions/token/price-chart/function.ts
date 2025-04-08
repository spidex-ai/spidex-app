import type { CardanoTokenPriceChartResultBodyType } from "./types";
import type { CardanoActionResult } from "../../cardano-action";

export async function getPriceChart(): Promise<CardanoActionResult<CardanoTokenPriceChartResultBodyType>> {
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