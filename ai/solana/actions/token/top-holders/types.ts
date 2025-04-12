import { z } from "zod";

import { TopHoldersInputSchema } from "./input-schema";
import { SolanaActionResult } from "../../solana-action";
import { TokenLargestAccount } from "@/services/helius";
import { TokenHolder } from "@/services/taptools/types";

export type TopHoldersSchemaType = typeof TopHoldersInputSchema;

export type TopHoldersArgumentsType = z.infer<TopHoldersSchemaType>;

export type TopHoldersResultBodyType = {
  topHolders: (TokenLargestAccount & {
    owner: string;
    percentageOwned: number;
  })[];
  percentageOwned: number;
};

export type TopHolderBodyType = {
  topHolders: any[];
  percentageOwned: number;
};
export type TopHoldersResultType = SolanaActionResult<TopHoldersResultBodyType>;

export type TopHolderNewResultType = SolanaActionResult<TopHolderBodyType>;
