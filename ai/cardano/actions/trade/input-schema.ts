import { z } from 'zod';

export const TradeInputSchema = z.object({
  outputMint: z
    .string()
    .optional()
    .transform(val => val === '' ? undefined : val)
    .transform(val => val === undefined ? 'c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad0014df105553444d' : val)
    .describe('The mint address of the token to receive.'),
  inputAmount: z
    .number()
    .positive()
    .optional()
    .describe('The amount of input token to swap'),
  inputMint: z
    .string()
    .optional()
    .transform(val => val === '' ? undefined : val) 
    .transform(val => val === undefined ? 'ADA' : val)
    .describe('The mint address of the token to swap.'),
  slippageBps: z
    .number()
    .default(5)
    .optional()
    .describe('The slippage tolerance in basis points (e.g., 100 for 1%)'),
});
