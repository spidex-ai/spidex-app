import { LAMPORTS_PER_SOL, PublicKey, Connection } from '@solana/web3.js';

import coreService from '@/services/core';
import { CardanoActionResult } from '../../cardano-action';
import { CardanoAllBalancesArgumentsType } from '@/ai/cardano';

export async function getAllBalances(
  connection: Connection,
  args: CardanoAllBalancesArgumentsType
): Promise<CardanoActionResult<any>> {
  try {
    const balance = await coreService.getBalances(args.walletAddress);
    return {
      message: `The user has been shown all of their balances in the UI. You do not need to list the balances again, instead ask what they want to do next.`,
      body: {
        balances: balance,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      message: `Error getting balances: ${error}`,
      body: {
        balances: [],
      },
    };
  }
}
