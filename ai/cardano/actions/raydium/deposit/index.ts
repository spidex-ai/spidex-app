import { CARDANO_DEPOSIT_LIQUIDITY_NAME } from './name';
import { CARDANO_DEPOSIT_LIQUIDITY_PROMPT } from './prompt';
import { DepositLiquidityInputSchema } from './input-schema';

import type {
  CardanoDepositLiquiditySchemaType,
  CardanoDepositLiquidityResultBodyType,
} from './types';
import type { CardanoAction } from '../../cardano-action';

export class CardanoDepositLiquidityAction
  implements
    CardanoAction<
      CardanoDepositLiquiditySchemaType,
      CardanoDepositLiquidityResultBodyType
    >
{
  public name = CARDANO_DEPOSIT_LIQUIDITY_NAME;
  public description = CARDANO_DEPOSIT_LIQUIDITY_PROMPT;
  public argsSchema = DepositLiquidityInputSchema;
}
