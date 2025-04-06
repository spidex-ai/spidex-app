import { CARDANO_BALANCE_NAME, } from "./name";
import { CARDANO_BALANCE_PROMPT } from "./prompt";
import { BalanceInputSchema } from "./input-schema";
import { BalanceResultBodyType } from "./types";
import { getBalance } from "./function";

import type { CardanoAction } from "../../cardano-action";


export class CardanoBalanceAction implements CardanoAction<typeof BalanceInputSchema, BalanceResultBodyType> {
  public name = CARDANO_BALANCE_NAME;
  public description = CARDANO_BALANCE_PROMPT;
  public argsSchema = BalanceInputSchema;
  public func = getBalance;
} 
