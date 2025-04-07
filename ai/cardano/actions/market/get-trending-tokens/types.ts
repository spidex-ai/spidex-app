import { z } from "zod";

import type { GetTrendingTokensInputSchema } from "./input-schema";
import type { TrendingToken } from "@/services/birdeye/types";
import { TopTokenMcap } from "@/services/taptools/types";
import { SolanaActionResult } from "@/ai/solana/actions/solana-action";

export type GetTrendingTokensSchemaType = typeof GetTrendingTokensInputSchema;

export type GetTrendingTokensArgumentsType = z.infer<GetTrendingTokensSchemaType>;

export type GetTrendingTokensResultBodyType = {
    tokens: TopTokenMcap[];
};

export type GetTrendingTokensResultType = SolanaActionResult<GetTrendingTokensResultBodyType>;