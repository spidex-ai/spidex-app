import { z } from 'zod';

export const GetTraderTradesInputSchema = z.object({
  address: z
    .string()
    .describe('The address of the trader to get the trades for'),
  limit: z
    .number()
    .default(10)
    .describe('The number of top holders to return. Defaults to 10'),
});
