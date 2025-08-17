import { Connection } from '@solana/web3.js';



import {
  CARDANO_ALL_BALANCES_NAME,
  CARDANO_GET_WALLET_ADDRESS_NAME,
  CARDANO_TRANSACTION_NAME,

} from '@/ai/action-names';

import {
  CardanoAllBalancesAction,
  CardanoBalanceAction,
  CardanoGetWalletAddressAction,
  cardanoTool,
} from '@/ai/cardano';

export const WALLET_TOOLS = {
  [`wallet-${CARDANO_GET_WALLET_ADDRESS_NAME}`]: cardanoTool(
    new CardanoGetWalletAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${CARDANO_TRANSACTION_NAME}`]: cardanoTool(
    new CardanoBalanceAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${CARDANO_ALL_BALANCES_NAME}`]: cardanoTool(
    new CardanoAllBalancesAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
