import { z } from 'zod';

import { BalanceInputSchema } from './input-schema';
import { SolanaActionResult } from '../../solana-action';
import { WalletTransaction } from '@/services/core/types';

export type BalanceSchemaType = typeof BalanceInputSchema;

export type BalanceArgumentsType = z.infer<BalanceSchemaType>;

export type BalanceResultBodyType = {
  balance: number;
  token: string;
  name: string;
  logoURI: string;
};

export type TransactionResultBodyType = {
  walletTx: WalletTransaction[];
};
export type BalanceResultType = SolanaActionResult<BalanceResultBodyType>;

export type TransactionResultType =
  SolanaActionResult<TransactionResultBodyType>;
