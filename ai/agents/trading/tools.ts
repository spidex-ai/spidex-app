import { Connection } from '@solana/web3.js';

import {
  SolanaGetTokenAddressAction,
  SolanaTradeAction,
} from '@/ai/solana/actions';

import {
  CARDANO_GET_TOKEN_ADDRESS_NAME,
  CARDANO_TRADE_NAME,
  SOLANA_GET_TOKEN_ADDRESS_NAME,
  SOLANA_TRADE_NAME,
} from '@/ai/action-names';
import { solanaTool } from '@/ai/solana';
import { cardanoTool } from '@/ai/cardano/ai-sdk';
import {
  CardanoGetTokenAddressAction,
  CardanoTradeAction,
} from '@/ai/cardano/actions';

export const TRADING_TOOLS = {
  [`trading-${SOLANA_TRADE_NAME}`]: solanaTool(
    new SolanaTradeAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`trading-${SOLANA_GET_TOKEN_ADDRESS_NAME}`]: solanaTool(
    new SolanaGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};

export const CARDANO_TRADING_TOOLS = {
  [`trading-${CARDANO_TRADE_NAME}`]: cardanoTool(
    new CardanoTradeAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`trading-${CARDANO_GET_TOKEN_ADDRESS_NAME}`]: cardanoTool(
    new CardanoGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
