import { z } from "zod";

import { LiquidStakingYieldsInputSchema } from "./input-schema";

import type { SolanaActionResult } from "../../cardano-action";
import type { Token } from "@/db/types";

export type LiquidStakingYieldsSchemaType = typeof LiquidStakingYieldsInputSchema;

export type LiquidStakingYieldsArgumentsType = z.infer<LiquidStakingYieldsSchemaType>;

export type LiquidStakingYieldsResultBodyType = {
    name: string;
    yield: number;
    tokenData: Token;
}[]

export type LiquidStakingYieldsResultType = SolanaActionResult<LiquidStakingYieldsResultBodyType>;