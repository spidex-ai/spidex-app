import { CARDANO_GET_LP_TOKENS_NAME } from "./name";
import { CARDANO_GET_LP_TOKENS_PROMPT } from "./prompt";
import { GetLpTokensInputSchema } from "./input-schema";
import { getLpTokens } from "./function";

import type { CardanoAction } from "../../cardano-action";
import type { GetLpTokensResultBodyType } from "./types";

export class CardanoGetLpTokensAction implements CardanoAction<typeof GetLpTokensInputSchema, GetLpTokensResultBodyType> {
  public name = CARDANO_GET_LP_TOKENS_NAME;
  public description = CARDANO_GET_LP_TOKENS_PROMPT;
  public argsSchema = GetLpTokensInputSchema;
  public func = getLpTokens;
} 
