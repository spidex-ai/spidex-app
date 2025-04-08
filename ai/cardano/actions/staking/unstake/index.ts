import { CARDANO_UNSTAKE_NAME } from "./name";
import { CARDANO_UNSTAKE_PROMPT } from "./prompt";
import { UnstakeInputSchema } from "./input-schema";

import type { CardanoUnstakeResultBodyType } from "./types";
import type { CardanoAction } from "../../cardano-action";

export class CardanoUnstakeAction implements CardanoAction<typeof UnstakeInputSchema, CardanoUnstakeResultBodyType> {
  public name = CARDANO_UNSTAKE_NAME;
  public description = CARDANO_UNSTAKE_PROMPT;
  public argsSchema = UnstakeInputSchema;
} 

