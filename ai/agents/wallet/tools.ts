import { Connection } from "@solana/web3.js";

import {
  SolanaAllBalancesAction,
  SolanaBalanceAction,
  SolanaGetTokenAddressAction,
  SolanaGetWalletAddressAction,
  SolanaTransferAction,
} from "@/ai/solana/actions";

import {
  CARDANO_ALL_BALANCES_NAME,
  CARDANO_GET_WALLET_ADDRESS_NAME,
  CARDANO_TRANSACTION_NAME,
  SOLANA_ALL_BALANCES_NAME,
  SOLANA_BALANCE_NAME,
  SOLANA_GET_TOKEN_ADDRESS_NAME,
  SOLANA_GET_WALLET_ADDRESS_NAME,
  SOLANA_TRANSFER_NAME,
} from "@/ai/action-names";
import { solanaTool } from "@/ai/solana";
import {
  CardanoAllBalancesAction,
  CardanoBalanceAction,
  cardanoTool,
} from "@/ai/cardano";

export const WALLET_TOOLS = {
  [`wallet-${CARDANO_GET_WALLET_ADDRESS_NAME}`]: cardanoTool(
    new SolanaGetWalletAddressAction(),
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
