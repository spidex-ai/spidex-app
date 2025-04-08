import { CARDANO_TRANSFER_NAME } from "./name";
import { CARDANO_TRANSFER_PROMPT } from "./prompt";
import { TransferInputSchema } from "./input-schema";

import type { CardanoTransferResultBodyType } from "./types";
import type { CardanoAction } from "../../cardano-action";


export class CardanoTransferAction implements CardanoAction<typeof TransferInputSchema, CardanoTransferResultBodyType> {
  public name = CARDANO_TRANSFER_NAME;
  public description = CARDANO_TRANSFER_PROMPT;
  public argsSchema = TransferInputSchema;
} 

