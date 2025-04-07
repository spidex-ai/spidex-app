import { z } from "zod";
import { UnstakeInputSchema } from "./input-schema";
import { CardanoActionResult } from "../../cardano-action";

export type CardanoUnstakeSchemaType = typeof UnstakeInputSchema;

export type CardanoUnstakeArgumentsType = z.infer<CardanoUnstakeSchemaType>;

export type CardanoUnstakeResultBodyType = {
    tx: string;
    inputAmount: number;
    symbol: string;
} 

export type CardanoUnstakeResultType = CardanoActionResult<CardanoUnstakeResultBodyType>;