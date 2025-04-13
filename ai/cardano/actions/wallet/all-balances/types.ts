import { z } from "zod";

import { AllBalancesInputSchema } from "./input-schema";
import type { CardanoActionResult } from "../../cardano-action";
import { WalletBalances } from "@/services/core/types";

export type CardanoAllBalancesSchemaType = typeof AllBalancesInputSchema;

export type CardanoAllBalancesArgumentsType =
  z.infer<CardanoAllBalancesSchemaType>;

export type CardanoAllBalancesResultBodyType = {
  balances: {
    balance: number;
    token: string;
    name: string;
    logoURI: string;
  }[];
  amount: {
    balance: number;
    token: string;
    name: string;
    logoURI: string;
    unit: string;
    ticker: string;
    quantity: string;
    logo: string;
  }[];
};

export type NewCardanoAllBalancesResultBodyType = {
  balances: WalletBalances;
};
export type CardanoAllBalancesResultType =
  CardanoActionResult<CardanoAllBalancesResultBodyType>;

export type NewCardanoAllBalancesResultType =
  CardanoActionResult<NewCardanoAllBalancesResultBodyType>;
