import { z } from "zod";

import { TokenPriceChartInputSchema } from "./input-schema";
import type { CardanoActionResult } from "../../cardano-action";

export type CardanoTokenPriceChartSchemaType = typeof TokenPriceChartInputSchema;

export type CardanoTokenPriceChartArgumentsType = z.infer<CardanoTokenPriceChartSchemaType>;

export type CardanoTokenPriceChartResultBodyType = {}; 

export type CardanoTokenPriceChartResultType = CardanoActionResult<CardanoTokenPriceChartResultBodyType>;
