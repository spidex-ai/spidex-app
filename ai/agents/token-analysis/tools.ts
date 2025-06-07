import { Connection } from '@solana/web3.js';
import {
  CARDANO_GET_TOKEN_DATA_NAME,
  CARDANO_TOP_HOLDERS_NAME,
  CARDANO_GET_TOKEN_ADDRESS_NAME,
  CARDANO_TOKEN_TOP_TRADERS_NAME,
  CARDANO_TOKEN_PRICE_CHART_NAME,
  CARDANO_TOKEN_HOLDERS_NAME,
} from '@/ai/action-names';

import {
  CardanoGetTokenAddressAction,
  CardanoGetTokenDataAction,
  CardanoTokenHoldersAction,
  CardanoTokenPriceChartAction,
  cardanoTool,
  CardanoTopHoldersAction,
  CardanoTopTokenTradersAction,
} from '@/ai/cardano';

export const TOKEN_ANALYSIS_TOOLS = {
  [`tokenanalysis-${CARDANO_GET_TOKEN_DATA_NAME}`]: cardanoTool(
    new CardanoGetTokenDataAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`tokenanalysis-${CARDANO_TOP_HOLDERS_NAME}`]: cardanoTool(
    new CardanoTopHoldersAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`tokenanalysis-${CARDANO_TOKEN_HOLDERS_NAME}`]: cardanoTool(
    new CardanoTokenHoldersAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`tokenanalysis-${CARDANO_GET_TOKEN_ADDRESS_NAME}`]: cardanoTool(
    new CardanoGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  // [`tokenanalysis-${CARDANO_TOKEN_TOP_TRADERS_NAME}`]: cardanoTool(new CardanoTopTokenTradersAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
  [`tokenanalysis-${CARDANO_TOKEN_PRICE_CHART_NAME}`]: cardanoTool(
    new CardanoTokenPriceChartAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
