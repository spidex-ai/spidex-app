import { CARDANO_TRADE_NAME } from "./name";
import { CARDANO_TRADE_PROMPT } from "./prompt";
import { TradeInputSchema } from "./input-schema";

import type { CardanoTradeResultBodyType, CardanoTradeSchemaType } from "./types";
import type { CardanoAction } from "../cardano-action";


export class CardanoTradeAction implements CardanoAction<CardanoTradeSchemaType, CardanoTradeResultBodyType> {
  public name = CARDANO_TRADE_NAME;
  public description = CARDANO_TRADE_PROMPT;
  public argsSchema = TradeInputSchema;
} 