import { CARDANO_GET_TOKEN_ADDRESS_NAME } from './name';
import { CARDANO_GET_TOKEN_ADDRESS_PROMPT } from './prompt';
import { GetTokenAddressArgumentsSchema } from './input-schema';
import { getTokenAddress } from './function';

import type { CardanoAction } from '../../cardano-action';
import { CardanoGetTokenAddressResultBodyType } from '@/ai/cardano';

export class CardanoGetTokenAddressAction
  implements
    CardanoAction<
      typeof GetTokenAddressArgumentsSchema,
      CardanoGetTokenAddressResultBodyType
    >
{
  public name = CARDANO_GET_TOKEN_ADDRESS_NAME;
  public description = CARDANO_GET_TOKEN_ADDRESS_PROMPT;
  public argsSchema = GetTokenAddressArgumentsSchema;
  public func = getTokenAddress;
}
