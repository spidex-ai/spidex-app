import { LAMPORTS_PER_SOL, PublicKey, Connection } from '@solana/web3.js';

import { getAssociatedTokenAddressSync } from '@solana/spl-token';

import type {
  CardanoBalanceArgumentsType,
  CardanoBalanceResultBodyType,
} from './types';
import type { CardanoActionResult } from '../../cardano-action';
import { getToken } from '@/db/services';
import coreService from '@/services/core';

export async function getBalance(
  connection: Connection,
  args: CardanoBalanceArgumentsType
): Promise<CardanoActionResult<any>> {
  try {
    let balance: number;

    const walletTx = await coreService.getTransactionHistory(
      args.walletAddress
    );

    return {
      message: `Found  latest ${walletTx.length} in ${args.walletAddress} transaction history. Do NOT reiterate the data you get from the tools afterwards, the user is shown the data in the UI.`,
      body: {
        walletTx,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      message: `Error getting balance: ${error}`,
    };
  }
}
