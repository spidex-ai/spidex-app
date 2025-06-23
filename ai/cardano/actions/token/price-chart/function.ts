import { CardanoActionResult } from '../../cardano-action';
import {
  CardanoTokenPriceChartArgumentsType,
  CardanoTokenPriceChartResultBodyType,
} from './types';

export async function getPriceChart(
  args: CardanoTokenPriceChartArgumentsType
): Promise<CardanoActionResult<CardanoTokenPriceChartResultBodyType>> {
  try {
    return {
      message: `The price chart has been retrieved and displayed to the user. Do not reiterate the raw data.`,
      body: {
        tokenUnit: args.tokenAddress,
      },
    };
  } catch (error) {
    return {
      message: `Error getting top holders: ${error}`,
    };
  }
}
