import { CARDANO_GET_LP_TOKENS_NAME } from './name';
import { CARDANO_GET_LP_TOKENS_PROMPT } from './prompt';
import { GetLpTokensInputSchema } from './input-schema';
import { getLpTokens } from './function';

import type { CardanoGetLpTokensResultBodyType } from './types';
import type { CardanoAction } from '../../cardano-action';

export class CardanoGetLpTokensAction
  implements
    CardanoAction<
      typeof GetLpTokensInputSchema,
      CardanoGetLpTokensResultBodyType
    >
{
  public name = CARDANO_GET_LP_TOKENS_NAME;
  public description = CARDANO_GET_LP_TOKENS_PROMPT;
  public argsSchema = GetLpTokensInputSchema;
  public func = getLpTokens;
}
