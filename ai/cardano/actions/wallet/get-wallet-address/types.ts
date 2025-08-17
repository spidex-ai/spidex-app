import { z } from 'zod';

import type { GetWalletAddressInputSchema } from './input-schema';
import type { CardanoActionResult } from '../../cardano-action';

export type CardanoGetWalletAddressSchemaType =
  typeof GetWalletAddressInputSchema;

export type CardanoGetWalletAddressArgumentsType =
  z.infer<CardanoGetWalletAddressSchemaType>;

export type CardanoGetWalletAddressResultBodyType = {
  address: string;
};

export type CardanoGetWalletAddressResultType =
  CardanoActionResult<CardanoGetWalletAddressResultBodyType>;
