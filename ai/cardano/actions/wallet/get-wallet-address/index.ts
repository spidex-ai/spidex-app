import { CARDANO_GET_WALLET_ADDRESS_NAME } from "./name";
import { CARDANO_GET_WALLET_ADDRESS_PROMPT } from "./prompt";
import { GetWalletAddressInputSchema } from "./input-schema";

import type { CardanoGetWalletAddressResultBodyType } from "./types";
import type { CardanoAction } from "../../cardano-action";


export class CardanoGetWalletAddressAction implements CardanoAction<typeof GetWalletAddressInputSchema, CardanoGetWalletAddressResultBodyType> {
  public name = CARDANO_GET_WALLET_ADDRESS_NAME;
  public description = CARDANO_GET_WALLET_ADDRESS_PROMPT;
  public argsSchema = GetWalletAddressInputSchema;
} 

