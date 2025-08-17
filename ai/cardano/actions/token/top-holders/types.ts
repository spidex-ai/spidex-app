import { z } from 'zod';

import { TopHoldersInputSchema } from './input-schema';
import { CardanoActionResult } from '../../cardano-action';

export type CardanoTopHoldersSchemaType = typeof TopHoldersInputSchema;

export type CardanoTopHoldersArgumentsType =
  z.infer<CardanoTopHoldersSchemaType>;

export type CardanoTopHoldersResultBodyType = {
  topHolders: any[];
  percentageOwned: number;
};

export type CardanoTopHoldersResultType =
  CardanoActionResult<CardanoTopHoldersResultBodyType>;
