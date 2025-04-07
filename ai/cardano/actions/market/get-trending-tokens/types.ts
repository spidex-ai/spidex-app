import { z } from "zod";

import type { GetTrendingTokensInputSchema } from "./input-schema";
import type { TopTokenMcap } from "@/services/taptools/types";
import { CardanoActionResult } from "@/ai/cardano/actions/cardano-action";

export type CardanoGetTrendingTokensSchemaType = typeof GetTrendingTokensInputSchema;

export type CardanoGetTrendingTokensArgumentsType = z.infer<CardanoGetTrendingTokensSchemaType>;

export type CardanoGetTrendingTokensResultBodyType = {
    tokens: TopTokenMcap[];
};

export type CardanoGetTrendingTokensResultType = CardanoActionResult<CardanoGetTrendingTokensResultBodyType>;