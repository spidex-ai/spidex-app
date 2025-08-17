import { z } from 'zod';

import { TokenHoldersInputSchema } from './input-schema';
import { CardanoActionResult } from '../../cardano-action';

export type CardanoTokenHoldersSchemaType = typeof TokenHoldersInputSchema;

export type CardanoTokenHoldersArgumentsType =
  z.infer<CardanoTokenHoldersSchemaType>;

export type CardanoTokenHoldersResultBodyType = {
  numHolders: number;
};

export type CardanoTokenHoldersResultType =
  CardanoActionResult<CardanoTokenHoldersResultBodyType>;
