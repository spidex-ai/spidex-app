import { z } from "zod";

import { AllBalancesInputSchema } from "./input-schema";
import type { SolanaActionResult } from "../../cardano-action";

export type AllBalancesSchemaType = typeof AllBalancesInputSchema;

export type AllBalancesArgumentsType = z.infer<AllBalancesSchemaType>;

export type AllBalancesResultBodyType = {
    balances: {
        balance: number;
        token: string;
        name: string;
        logoURI: string;
    }[];
}; 

export type AllBalancesResultType = SolanaActionResult<AllBalancesResultBodyType>;
