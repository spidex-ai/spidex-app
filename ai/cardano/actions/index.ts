import { CardanoTradeAction } from "./trade";
import { CardanoGetTrendingTokensAction } from "./market";
import {  CardanoBalanceAction, CardanoTransferAction, CardanoGetWalletAddressAction, CardanoAllBalancesAction } from "./wallet";
import {  CardanoStakeAction, CardanoUnstakeAction, CardanoLiquidStakingYieldsAction } from "./staking";
import { CardanoGetTokenAddressAction, CardanoGetTokenDataAction, CardanoTopHoldersAction, CardanoTokenHoldersAction } from "./token";

import type { CardanoAction, CardanoActionSchemaAny } from "./cardano-action";

export const getAllCardanoActions = (): CardanoAction<CardanoActionSchemaAny, any>[] => {
  return [
    new CardanoBalanceAction(),
    new CardanoTransferAction(),
    new CardanoTradeAction(),
    new CardanoGetWalletAddressAction(),
    new CardanoGetTrendingTokensAction(),
    new CardanoGetTokenDataAction(),
    new CardanoStakeAction(),
    new CardanoUnstakeAction(),
    new CardanoAllBalancesAction(),
    new CardanoLiquidStakingYieldsAction(),
    new CardanoGetTokenAddressAction(),
    new CardanoTokenHoldersAction(),
    new CardanoTopHoldersAction()
 
  ];
}

export const CARDANO_ACTIONS = getAllCardanoActions();

export * from './types';
export * from './cardano-action';

export * from './trade';
export * from './market';
export * from './raydium';
export * from './staking';
export * from './wallet';
export * from './token';