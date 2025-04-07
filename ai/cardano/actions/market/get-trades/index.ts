import { CARDANO_GET_TRADER_TRADES_NAME, SOLANA_GET_TRADER_TRADES_NAME } from "./name";
import { SOLANA_GET_TRADER_TRADES_PROMPT } from "./prompt";
import { GetTraderTradesInputSchema } from "./input-schema";
import { getTraderTrades } from "./function";

import type { GetTraderTradesResultBodyType } from "./types";
import { CardanoAction } from "../../cardano-action";

export class CardanoGetTraderTradesAction implements CardanoAction<typeof GetTraderTradesInputSchema, GetTraderTradesResultBodyType> {
  public name = CARDANO_GET_TRADER_TRADES_NAME;
  public description = SOLANA_GET_TRADER_TRADES_PROMPT;
  public argsSchema = GetTraderTradesInputSchema;
  public func = getTraderTrades;
} 