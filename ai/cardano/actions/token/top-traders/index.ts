import { CARDANO_TOKEN_TOP_TRADERS_NAME } from './name';
import { CARDANO_TOKEN_TOP_TRADERS_PROMPT } from './prompt';
import { TopTokenTradersInputSchema } from './input-schema';
import type { CardanoTopTokenTradersResultBodyType } from './types';

import { getTopTokenTraders } from './function';

import type { CardanoAction } from '../../cardano-action';

export class CardanoTopTokenTradersAction
  implements
    CardanoAction<
      typeof TopTokenTradersInputSchema,
      CardanoTopTokenTradersResultBodyType
    >
{
  public name = CARDANO_TOKEN_TOP_TRADERS_NAME;
  public description = CARDANO_TOKEN_TOP_TRADERS_PROMPT;
  public argsSchema = TopTokenTradersInputSchema;
  public func = getTopTokenTraders;
}
