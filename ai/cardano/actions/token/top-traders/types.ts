import { z } from 'zod';

import { TopTokenTradersInputSchema } from './input-schema';
import { CardanoActionResult } from '../../cardano-action';


export type CardanoTopTokenTradersSchemaType =
  typeof TopTokenTradersInputSchema;

export type CardanoTopTokenTradersArgumentsType =
  z.infer<CardanoTopTokenTradersSchemaType>;

export type CardanoTopTokenTradersResultBodyType = {
  topTraders: any[];
};

export type CardanoTopTokenTradersResultType =
  CardanoActionResult<CardanoTopTokenTradersResultBodyType>;
