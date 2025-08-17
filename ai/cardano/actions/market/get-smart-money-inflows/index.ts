import { CARDANO_GET_SMART_MONEY_INFLOWS_NAME } from './name';
import { CARDANO_GET_SMART_MONEY_INFLOWS_PROMPT } from './prompt';
import { GetSmartMoneyInflowsInputSchema } from './input-schema';
import { getSmartMoneyInflows } from './function';

import type { CardanoGetSmartMoneyInflowsResultBodyType } from './types';
import type { CardanoAction } from '../../cardano-action';

export class CardanoGetSmartMoneyInflowsAction
  implements
    CardanoAction<
      typeof GetSmartMoneyInflowsInputSchema,
      CardanoGetSmartMoneyInflowsResultBodyType
    >
{
  public name = CARDANO_GET_SMART_MONEY_INFLOWS_NAME;
  public description = CARDANO_GET_SMART_MONEY_INFLOWS_PROMPT;
  public argsSchema = GetSmartMoneyInflowsInputSchema;
  public func = getSmartMoneyInflows;
}
