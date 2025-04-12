import { SOLANA_BALANCE_PROMPT } from "./prompt";
import { BalanceInputSchema } from "./input-schema";
import { BalanceResultBodyType } from "./types";
import { getBalance } from "./function";

import type { SolanaAction } from "../../solana-action";
import { CARDANO_TRANSACTION_NAME } from "@/ai/action-names";

export class SolanaBalanceAction
  implements SolanaAction<typeof BalanceInputSchema, BalanceResultBodyType>
{
  public name = CARDANO_TRANSACTION_NAME;
  public description = SOLANA_BALANCE_PROMPT;
  public argsSchema = BalanceInputSchema;
  public func = getBalance;
}
