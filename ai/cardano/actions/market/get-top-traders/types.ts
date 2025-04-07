import { z } from "zod";

import type { GetTopTradersInputSchema } from "./input-schema";
import type { TopTrader } from "@/services/birdeye/types";
import { SolanaActionResult } from "@/ai/solana/actions/solana-action";
import { TokenHolder } from "@/services/taptools/types";

export type GetTopTradersSchemaType = typeof GetTopTradersInputSchema;

export type GetTopTradersArgumentsType = z.infer<GetTopTradersSchemaType>;

export type GetTopTradersResultBodyType = {
    traders: TokenHolder[];
};

export type GetTopTradersResultType = SolanaActionResult<GetTopTradersResultBodyType>;
