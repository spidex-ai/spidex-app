import {
  CARDANO_TOKEN_PAGE_TOP_HOLDERS_NAME,
} from './name';
import {
  CARDANO_TOKEN_PAGE_TOP_HOLDERS_PROMPT,
} from './prompt';
import { TokenPageTopHoldersInputSchema } from './input-schema';
import { TokenPageTopHoldersResultBodyType } from './types';
import { getTokenPageTopHolders } from './function';

import type { TokenPageAction } from '../token-page-action';

export class CardanoTokenPageTopHoldersAction
  implements
    TokenPageAction<
      typeof TokenPageTopHoldersInputSchema,
      TokenPageTopHoldersResultBodyType
    >
{
  public name = CARDANO_TOKEN_PAGE_TOP_HOLDERS_NAME;
  public description = CARDANO_TOKEN_PAGE_TOP_HOLDERS_PROMPT;
  public argsSchema = TokenPageTopHoldersInputSchema;
  public func = getTokenPageTopHolders;
}
