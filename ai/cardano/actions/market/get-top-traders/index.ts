import { CARDANO_GET_TOP_TRADERS_NAME } from './name';
import { CARDANO_GET_TOP_TRADERS_PROMPT } from './prompt';
import { GetTopTradersInputSchema } from './input-schema';
import { getTopTraders } from './function';

import type { CardanoGetTopTradersResultBodyType } from './types';
import { CardanoAction } from '../../cardano-action';

export class CardanpGetTopTradersAction
  implements
    CardanoAction<
      typeof GetTopTradersInputSchema,
      CardanoGetTopTradersResultBodyType
    >
{
  public name = CARDANO_GET_TOP_TRADERS_NAME;
  public description = CARDANO_GET_TOP_TRADERS_PROMPT;
  public argsSchema = GetTopTradersInputSchema;
  public func = getTopTraders;
}
