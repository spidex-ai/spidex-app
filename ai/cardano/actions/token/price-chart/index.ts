import { CARDANO_TOKEN_PRICE_CHART_NAME } from "./name";
import { CARDANO_TOKEN_PRICE_CHART_PROMPT } from "./prompt";
import { TokenPriceChartInputSchema } from "./input-schema";
import { TokenPriceChartResultBodyType } from "./types";
import { getPriceChart } from "./function";

import type { CardanoAction } from "../../cardano-action"; 

export class CardanoTokenPriceChartAction implements CardanoAction<typeof TokenPriceChartInputSchema, TokenPriceChartResultBodyType> {
  public name = CARDANO_TOKEN_PRICE_CHART_NAME;
  public description = CARDANO_TOKEN_PRICE_CHART_PROMPT; 
  public argsSchema = TokenPriceChartInputSchema;
  public func = getPriceChart;
} 