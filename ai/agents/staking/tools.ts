import { Connection } from '@solana/web3.js';


import {
  CARDANO_STAKE_NAME,
  CARDANO_LIQUID_STAKING_YIELDS_NAME,
  CARDANO_GET_TOKEN_ADDRESS_NAME,
  CARDANO_UNSTAKE_NAME,
} from '@/ai/action-names';
import {
  CardanoStakeAction,
  CardanoUnstakeAction,
  CardanoLiquidStakingYieldsAction,
  CardanoGetTokenAddressAction,
} from '@/ai/cardano/actions';
import { cardanoTool } from '@/ai/cardano';

export const STAKING_TOOLS = {
  [`staking-${CARDANO_STAKE_NAME}`]: cardanoTool(
    new CardanoStakeAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`staking-${CARDANO_UNSTAKE_NAME}`]: cardanoTool(
    new CardanoUnstakeAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`staking-${CARDANO_LIQUID_STAKING_YIELDS_NAME}`]: cardanoTool(
    new CardanoLiquidStakingYieldsAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`staking-${CARDANO_GET_TOKEN_ADDRESS_NAME}`]: cardanoTool(
    new CardanoGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
