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
    null
  ),
  [`wallet-${CARDANO_TRANSACTION_NAME}`]: cardanoTool(
    new CardanoBalanceAction(),
    null
  ),
  [`wallet-${CARDANO_ALL_BALANCES_NAME}`]: cardanoTool(
    new CardanoAllBalancesAction(),
    null
  ),
};
