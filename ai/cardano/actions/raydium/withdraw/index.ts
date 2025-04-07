import { CARDANO_WITHDRAW_LIQUIDITY_NAME } from "./name";
import { CARDANO_WITHDRAW_LIQUIDITY_PROMPT } from "./prompt";
import { WithdrawLiquidityInputSchema } from "./input-schema";

import type { CardanoWithdrawLiquiditySchemaType, CardanoWithdrawLiquidityResultBodyType } from "./types";
import type { CardanoAction } from "../../cardano-action";

export class CardanoWithdrawLiquidityAction implements CardanoAction<CardanoWithdrawLiquiditySchemaType, CardanoWithdrawLiquidityResultBodyType> {
  public name = CARDANO_WITHDRAW_LIQUIDITY_NAME;
  public description = CARDANO_WITHDRAW_LIQUIDITY_PROMPT;
  public argsSchema = WithdrawLiquidityInputSchema;
} 