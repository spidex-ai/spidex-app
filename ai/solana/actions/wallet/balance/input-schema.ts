import { z } from "zod";

export const BalanceInputSchema = z.object({
  walletAddress: z
    .string()
    .describe("The wallet address to check transaction for"),
});
