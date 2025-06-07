import { z } from 'zod';

export const GetTopTradersInputSchema = z.object({
  limit: z
    .number()
    .default(10)
    .describe('The number of top holders to return. Defaults to 10'),
});
