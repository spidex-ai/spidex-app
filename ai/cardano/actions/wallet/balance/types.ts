import { z } from "zod";

import { BalanceInputSchema } from "./input-schema";
import { CardanoActionResult } from "../../cardano-action";

export type CardanoBalanceSchemaType = typeof BalanceInputSchema;

export type CardanoBalanceArgumentsType = z.infer<CardanoBalanceSchemaType>;

export type CardanoBalanceResultBodyType = {
    balance: number;
    token: string;
    name: string;
    logoURI: string;
}; 

export type CardanoBalanceResultType = CardanoActionResult<CardanoBalanceResultBodyType>;