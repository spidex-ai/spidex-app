import { z } from "zod";
import { DepositLiquidityInputSchema } from "./input-schema";
import { CardanoActionResult } from "../../cardano-action";

export type CardanoDepositLiquiditySchemaType = typeof DepositLiquidityInputSchema;

export type CardanoDepositLiquidityArgumentsType = z.infer<CardanoDepositLiquiditySchemaType>;

export type CardanoDepositLiquidityResultBodyType = {
    transaction: string;
} 

export type CardanoDepositLiquidityResultType = CardanoActionResult<CardanoDepositLiquidityResultBodyType>;