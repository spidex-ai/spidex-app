import { Connection } from '@solana/web3.js';

import {
  SolanaGetTrendingTokensAction,
  SolanaGetTopTradersAction,
  SolanaGetTraderTradesAction,
  SolanaGetSmartMoneyInflowsAction,
} from '@/ai/solana/actions';

import {
  SOLANA_GET_TRENDING_TOKENS_NAME,
  SOLANA_GET_TOP_TRADERS_NAME,
  SOLANA_GET_TRADER_TRADES_NAME,
  SOLANA_GET_SMART_MONEY_INFLOWS_NAME,
  CARDANO_GET_TRENDING_TOKENS_NAME,
  CARDANO_GET_TOP_TRADERS_NAME,
  CARDANO_GET_TRADER_TRADES_NAME,
} from '@/ai/action-names';

import { solanaTool } from '@/ai/solana';
import {
  CardanoGetSmartMoneyInflowsAction,
  CardanoGetTraderTradesAction,
  CardanoGetTrendingTokensAction,
  CardanpGetTopTradersAction,
} from '@/ai/cardano/actions';
import { cardanoTool } from '@/ai/cardano/ai-sdk';

export const MARKET_TOOLS = {
  [`market-${CARDANO_GET_TRENDING_TOKENS_NAME}`]: cardanoTool(
    new CardanoGetTrendingTokensAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`market-${CARDANO_GET_TOP_TRADERS_NAME}`]: cardanoTool(
    new CardanpGetTopTradersAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`market-${CARDANO_GET_TRADER_TRADES_NAME}`]: cardanoTool(
    new CardanoGetTraderTradesAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`market-${SOLANA_GET_SMART_MONEY_INFLOWS_NAME}`]: cardanoTool(
    new CardanoGetSmartMoneyInflowsAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
