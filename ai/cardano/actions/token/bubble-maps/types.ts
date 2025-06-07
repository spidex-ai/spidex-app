import { z } from 'zod';

import { BubbleMapsArgumentsSchema } from './input-schema';
import { CardanoActionResult } from '../../cardano-action';

export type CardanoBubbleMapsSchemaType = typeof BubbleMapsArgumentsSchema;

export type CardanoBubbleMapsArgumentsType =
  z.infer<CardanoBubbleMapsSchemaType>;

export type CardanoBubbleMapsResultBodyType = {
  success: boolean;
};

export type CardanoBubbleMapsResultType =
  CardanoActionResult<CardanoBubbleMapsResultBodyType>;
