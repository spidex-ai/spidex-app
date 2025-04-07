import { z } from "zod";

import { GetPoolsInputSchema } from "./input-schema";

import type { CardanoActionResult } from "../../cardano-action";
import type { ApiV3PoolInfoItem } from "@raydium-io/raydium-sdk-v2";
import type { DexScreenerPair } from "@/services/dexscreener/types";

export type CardanoGetPoolsSchemaType = typeof GetPoolsInputSchema;

export type CardanoGetPoolsArgumentsType = z.infer<CardanoGetPoolsSchemaType>;

export type CardanoGetPoolsResultBodyType = {
    pools: {
        pair: DexScreenerPair;
        pool: ApiV3PoolInfoItem
    }[];
}; 

export type CardanoGetPoolsResultType = CardanoActionResult<CardanoGetPoolsResultBodyType>;