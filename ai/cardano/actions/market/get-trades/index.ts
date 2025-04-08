import { CARDANO_GET_TRADER_TRADES_NAME } from "./name";
import { CARDANO_GET_TRADER_TRADES_PROMPT } from "./prompt";
import { GetTraderTradesInputSchema } from "./input-schema";
import { getTraderTrades } from "./function";

import type { CardanoGetTraderTradesResultBodyType } from "./types";
import { CardanoAction } from "../../cardano-action";

export class CardanoGetTraderTradesAction implements CardanoAction<typeof GetTraderTradesInputSchema, CardanoGetTraderTradesResultBodyType> {
  public name = CARDANO_GET_TRADER_TRADES_NAME;
  public description = CARDANO_GET_TRADER_TRADES_PROMPT;
  public argsSchema = GetTraderTradesInputSchema;
  public func = getTraderTrades;
} 