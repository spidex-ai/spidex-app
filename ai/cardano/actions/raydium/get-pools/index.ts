import { CARDANO_GET_POOLS_NAME } from './name';
import { CARDANO_GET_POOLS_PROMPT } from './prompt';
import { GetPoolsInputSchema } from './input-schema';
import { getPools } from './function';

import type { CardanoGetPoolsResultBodyType } from './types';
import type { CardanoAction } from '../../cardano-action';

export class CardanoGetPoolsAction
  implements
    CardanoAction<typeof GetPoolsInputSchema, CardanoGetPoolsResultBodyType>
{
  public name = CARDANO_GET_POOLS_NAME;
  public description = CARDANO_GET_POOLS_PROMPT;
  public argsSchema = GetPoolsInputSchema;
  public func = getPools;
}
