import { CARDANO_STAKE_NAME } from "./name";
import { CARDANO_STAKE_PROMPT } from "./prompt";
import { StakeInputSchema } from "./input-schema";

import type { StakeResultBodyType } from "./types";
import type { CardanoAction } from "../../cardano-action";


export class CardanoStakeAction implements CardanoAction<typeof StakeInputSchema, StakeResultBodyType> {
  public name = CARDANO_STAKE_NAME;
  public description = CARDANO_STAKE_PROMPT;
  public argsSchema = StakeInputSchema;
} 

