import { CARDANO_GET_TOKEN_ADDRESS_NAME } from "./name";
import { CARDANO_GET_TOKEN_ADDRESS_PROMPT } from "./prompt";
import { GetTokenAddressArgumentsSchema } from "./input-schema";
import { getTokenAddress } from "./function";

import type { CardanoAction } from "../../cardano-action";
import type { GetTokenAddressResultBodyType } from "./types";



export class CardanoGetTokenAddressAction implements CardanoAction<typeof GetTokenAddressArgumentsSchema, GetTokenAddressResultBodyType> { 
  public name = CARDANO_GET_TOKEN_ADDRESS_NAME;
  public description = CARDANO_GET_TOKEN_ADDRESS_PROMPT;
  public argsSchema = GetTokenAddressArgumentsSchema;
  public func = getTokenAddress;
} 
