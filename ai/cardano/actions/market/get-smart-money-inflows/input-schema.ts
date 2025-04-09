import { z } from "zod";

import { Granularity } from "@/services/hellomoon/types";

export const GetSmartMoneyInflowsInputSchema = z.object({
    granularity: z.nativeEnum(Granularity).default(Granularity.ONE_WEEK),
    limit: z.number()
        .default(10)
        .describe("The number of top volume token to return. Defaults to 10"),
}); 