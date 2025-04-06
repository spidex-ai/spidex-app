import { CARDANO_TOP_HOLDERS_NAME } from "./name";
import { CARDANO_TOP_HOLDERS_PROMPT } from "./prompt";
import { TopHoldersInputSchema } from "./input-schema";
import { TopHoldersResultBodyType } from "./types";
import { getTopHolders } from "./function";

import type { CardanoAction } from "../../cardano-action";


export class CardanoTopHoldersAction implements CardanoAction<typeof TopHoldersInputSchema, TopHoldersResultBodyType> {
  public name = CARDANO_TOP_HOLDERS_NAME;
  public description = CARDANO_TOP_HOLDERS_PROMPT;
  public argsSchema = TopHoldersInputSchema;
  public func = getTopHolders;
} 
