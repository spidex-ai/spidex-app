import { z } from "zod";
import { TransferInputSchema } from "./input-schema";
import { CardanoActionResult } from "../../cardano-action";

export type CardanoTransferSchemaType = typeof TransferInputSchema;

export type CardanoTransferArgumentsType = z.infer<CardanoTransferSchemaType>;

export type CardanoTransferResultBodyType = {
    amount: number;
    recipient: string;
    token: string;
    transaction: string;
};

export type CardanoTransferResultType = CardanoActionResult<CardanoTransferResultBodyType>;