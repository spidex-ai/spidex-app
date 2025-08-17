import { CARDANO_GET_TRENDING_TOKENS_NAME } from './name';
import { CARDANO_GET_TRENDING_TOKENS_PROMPT } from './prompt';
import { GetTrendingTokensInputSchema } from './input-schema';
import { getTrendingTokens } from './function';

import type { CardanoGetTrendingTokensResultBodyType } from './types';
import type { CardanoAction } from '../../cardano-action';

export class CardanoGetTrendingTokensAction
  implements
    CardanoAction<
      typeof GetTrendingTokensInputSchema,
      CardanoGetTrendingTokensResultBodyType
    >
{
  public name = CARDANO_GET_TRENDING_TOKENS_NAME;
  public description = CARDANO_GET_TRENDING_TOKENS_PROMPT;
  public argsSchema = GetTrendingTokensInputSchema;
  public func = getTrendingTokens;
}
