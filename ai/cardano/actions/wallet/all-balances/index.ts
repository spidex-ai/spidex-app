import { CARDANO_ALL_BALANCES_NAME } from "./name";
import { CARDANO_ALL_BALANCES_PROMPT } from "./prompt";
import { AllBalancesInputSchema } from "./input-schema";
import { getAllBalances } from "./function";

import type { AllBalancesResultBodyType } from "./types";
import type { CardanoAction } from "../../cardano-action";


export class CardanoAllBalancesAction implements CardanoAction<typeof AllBalancesInputSchema, AllBalancesResultBodyType> {
  public name = CARDANO_ALL_BALANCES_NAME;
  public description = CARDANO_ALL_BALANCES_PROMPT;
  public argsSchema = AllBalancesInputSchema;
  public func = getAllBalances;
} 
