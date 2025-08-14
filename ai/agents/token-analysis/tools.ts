import {
  CARDANO_GET_TOKEN_ADDRESS_NAME,
  CARDANO_GET_TOKEN_DATA_NAME,
  CARDANO_TOKEN_HOLDERS_NAME,
  CARDANO_TOKEN_PRICE_CHART_NAME,
  CARDANO_TOP_HOLDERS_NAME,
} from '@/ai/action-names';

import {
  CardanoGetTokenAddressAction,
  CardanoGetTokenDataAction,
  CardanoTokenHoldersAction,
  CardanoTokenPriceChartAction,
  cardanoTool,
  CardanoTopHoldersAction,
} from '@/ai/cardano';

export const TOKEN_ANALYSIS_TOOLS = {
  [`tokenanalysis-${CARDANO_GET_TOKEN_DATA_NAME}`]: cardanoTool(
    new CardanoGetTokenDataAction(),
    null
  ),
  [`tokenanalysis-${CARDANO_TOP_HOLDERS_NAME}`]: cardanoTool(
    new CardanoTopHoldersAction(),
    null
  ),
  [`tokenanalysis-${CARDANO_TOKEN_HOLDERS_NAME}`]: cardanoTool(
    new CardanoTokenHoldersAction(),
    null
  ),
  [`tokenanalysis-${CARDANO_GET_TOKEN_ADDRESS_NAME}`]: cardanoTool(
    new CardanoGetTokenAddressAction(),
    null
  ),
  // [`tokenanalysis-${CARDANO_TOKEN_TOP_TRADERS_NAME}`]: cardanoTool(new CardanoTopTokenTradersAction(), null),
  [`tokenanalysis-${CARDANO_TOKEN_PRICE_CHART_NAME}`]: cardanoTool(
    new CardanoTokenPriceChartAction(),
    null
  ),
};
