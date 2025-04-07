import { z } from "zod";
import { WithdrawLiquidityInputSchema } from "./input-schema";
import { CardanoActionResult } from "../../cardano-action";

export type CardanoWithdrawLiquiditySchemaType = typeof WithdrawLiquidityInputSchema;

export type CardanoWithdrawLiquidityArgumentsType = z.infer<CardanoWithdrawLiquiditySchemaType>;

export type CardanoWithdrawLiquidityResultBodyType = {
    transaction: string;
} 

export type CardanoWithdrawLiquidityResultType = CardanoActionResult<CardanoWithdrawLiquidityResultBodyType>;