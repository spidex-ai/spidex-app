import { z } from "zod";
import { TransferInputSchema } from "./input-schema";
import { SolanaActionResult } from "../../cardano-action";

export type SolanaTransferSchemaType = typeof TransferInputSchema;

export type SolanaTransferArgumentsType = z.infer<SolanaTransferSchemaType>;

export type SolanaTransferResultBodyType = {
    amount: number;
    recipient: string;
    token: string;
    transaction: string;
};

export type SolanaTransferResultType = SolanaActionResult<SolanaTransferResultBodyType>;