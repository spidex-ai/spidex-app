import { z } from "zod";

import { TopHoldersInputSchema } from "./input-schema";
import { CardanoActionResult } from "../../cardano-action";
import { TokenLargestAccount } from "@/services/helius";

export type CardanoTopHoldersSchemaType = typeof TopHoldersInputSchema;

export type CardanoTopHoldersArgumentsType = z.infer<CardanoTopHoldersSchemaType>;

export type CardanoTopHoldersResultBodyType = {
    topHolders: (TokenLargestAccount & { owner: string, percentageOwned: number })[];
    percentageOwned: number;
}; 

export type CardanoTopHoldersResultType = CardanoActionResult<CardanoTopHoldersResultBodyType>;
