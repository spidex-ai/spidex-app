
import { CARDANO_GET_TOKEN_DATA_PROMPT } from "./prompt";
import { GetTokenDataInputSchema } from "./input-schema";
import { getTokenData } from "./function";

import type { CardanoAction } from "../../cardano-action";
import type { GetTokenDataResultBodyType } from "./types";
import { CARDANO_GET_TOKEN_DATA_NAME } from "./name";


export class CardanoGetTokenDataAction implements CardanoAction<typeof GetTokenDataInputSchema, GetTokenDataResultBodyType> {
  public name = CARDANO_GET_TOKEN_DATA_NAME;  
  public description = CARDANO_GET_TOKEN_DATA_PROMPT;
  public argsSchema = GetTokenDataInputSchema;
  public func = getTokenData;
} 
