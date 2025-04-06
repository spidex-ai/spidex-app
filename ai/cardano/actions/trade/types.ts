import { z } from "zod";
import { TradeInputSchema } from "./input-schema";
import { CardanoActionResult } from "../cardano-action";

export type CardanoTradeSchemaType = typeof TradeInputSchema;

export type CardanoTradeArgumentsType = z.infer<CardanoTradeSchemaType>;

export type CardanoTradeResultBodyType = {
    transaction: string;
    inputAmount: number;
    inputToken: string;
    outputToken: string;
} 

export type CardanoTradeResultType = CardanoActionResult<CardanoTradeResultBodyType>;