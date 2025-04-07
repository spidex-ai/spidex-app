import { z } from "zod";

import { GetLpTokensInputSchema } from "./input-schema";

import type { CardanoActionResult } from "../../cardano-action";
import type { LpToken } from "@/services/raydium/types";

export type CardanoGetLpTokensSchemaType = typeof GetLpTokensInputSchema;

export type CardanoGetLpTokensArgumentsType = z.infer<CardanoGetLpTokensSchemaType>;

export type CardanoGetLpTokensResultBodyType = {
    lpTokens: LpToken[];
}; 

export type CardanoGetLpTokensResultType = CardanoActionResult<CardanoGetLpTokensResultBodyType>;