import { Connection } from '@solana/web3.js';



import {
  CARDANO_GET_TOKEN_ADDRESS_NAME,
  CARDANO_TRADE_NAME,

} from '@/ai/action-names';

import { cardanoTool } from '@/ai/cardano/ai-sdk';
import {
  CardanoGetTokenAddressAction,
  CardanoTradeAction,
} from '@/ai/cardano/actions';

export const CARDANO_TRADING_TOOLS = {
  [`trading-${CARDANO_TRADE_NAME}`]: cardanoTool(
    new CardanoTradeAction(),
    null
  ),
  [`trading-${CARDANO_GET_TOKEN_ADDRESS_NAME}`]: cardanoTool(
    new CardanoGetTokenAddressAction(),
    null
  ),
};
