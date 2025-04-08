import { CARDANO_TOKEN_HOLDERS_NAME } from "./name";
import { CARDANO_TOKEN_HOLDERS_PROMPT } from "./prompt";
import { TokenHoldersInputSchema } from "./input-schema";
import { getNumHolders } from "./function";
import type { CardanoTokenHoldersResultBodyType } from "./types";
import type { CardanoAction } from "../../cardano-action";


export class CardanoTokenHoldersAction implements CardanoAction<typeof TokenHoldersInputSchema, CardanoTokenHoldersResultBodyType> {
  public name = CARDANO_TOKEN_HOLDERS_NAME;
  public description = CARDANO_TOKEN_HOLDERS_PROMPT;
  public argsSchema = TokenHoldersInputSchema;
  public func = getNumHolders;
} 
