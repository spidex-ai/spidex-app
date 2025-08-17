import { z } from 'zod';

import { GetTokenDataInputSchema } from './input-schema';

import type { CardanoActionResult } from '../../cardano-action';


export type CardanoGetTokenDataSchemaType = typeof GetTokenDataInputSchema;

export type CardanoGetTokenDataArgumentsType =
  z.infer<CardanoGetTokenDataSchemaType>;

export type CardanoGetTokenDataResultBodyType = {
  token: any;
};

export type CardanoGetTokenDataResultType =
  CardanoActionResult<CardanoGetTokenDataResultBodyType>;
