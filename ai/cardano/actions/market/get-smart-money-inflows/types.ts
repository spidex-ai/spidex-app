import { z } from "zod";

import type { GetSmartMoneyInflowsInputSchema } from "./input-schema";
import type { CardanoActionResult } from "../../cardano-action";
import type { SmartMoneyTokenInflow } from "@/services/hellomoon/types";
import type { Price, TokenMetadata } from "@/services/birdeye/types";

export type CardanoGetSmartMoneyInflowsSchemaType = typeof GetSmartMoneyInflowsInputSchema;

export type CardanoGetSmartMoneyInflowsArgumentsType = z.infer<CardanoGetSmartMoneyInflowsSchemaType>;

export type CardanoGetSmartMoneyInflowsResultBodyType = {
    tokens: any[];
};

export type CardanoGetSmartMoneyInflowsResultType = CardanoActionResult<CardanoGetSmartMoneyInflowsResultBodyType>;