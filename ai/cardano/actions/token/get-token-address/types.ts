import { z } from "zod";

import { GetTokenAddressArgumentsSchema } from "./input-schema";
import { CardanoActionResult } from "../../cardano-action";

export type CardanoGetTokenAddressSchemaType = typeof GetTokenAddressArgumentsSchema;

export type CardanoGetTokenAddressArgumentsType = z.infer<CardanoGetTokenAddressSchemaType>;

export type CardanoGetTokenAddressResultBodyType = {
    address: string;
}; 

export type CardanoGetTokenAddressResultType = CardanoActionResult<CardanoGetTokenAddressResultBodyType>;