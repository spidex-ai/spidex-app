import { Connection } from "@solana/web3.js";

// import { SolanaStakeAction, SolanaUnstakeAction, SolanaLiquidStakingYieldsAction, SolanaGetTokenAddressAction } from "@/ai/solana/actions";

import { CARDANO_STAKE_NAME, CARDANO_LIQUID_STAKING_YIELDS_NAME, CARDANO_GET_TOKEN_ADDRESS_NAME, CARDANO_UNSTAKE_NAME } from "@/ai/action-names";
// import { solanaTool } from "@/ai/solana";
import { CardanoStakeAction, CardanoUnstakeAction, CardanoLiquidStakingYieldsAction, CardanoGetTokenAddressAction } from "@/ai/cardano/actions";
import { cardanoTool } from "@/ai/cardano";

// export const STAKING_TOOLS = {
//     [`staking-${SOLANA_STAKE_NAME}`]: solanaTool(new SolanaStakeAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
//     [`staking-${SOLANA_UNSTAKE_NAME}`]: solanaTool(new SolanaUnstakeAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
//     [`staking-${SOLANA_LIQUID_STAKING_YIELDS_NAME}`]: solanaTool(new SolanaLiquidStakingYieldsAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
//     [`staking-${SOLANA_GET_TOKEN_ADDRESS_NAME}`]: solanaTool(new SolanaGetTokenAddressAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
// }


export const STAKING_TOOLS = {
    [`staking-${CARDANO_STAKE_NAME}`]: cardanoTool(new CardanoStakeAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
    [`staking-${CARDANO_UNSTAKE_NAME}`]: cardanoTool(new CardanoUnstakeAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
    [`staking-${CARDANO_LIQUID_STAKING_YIELDS_NAME}`]: cardanoTool(new CardanoLiquidStakingYieldsAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
    [`staking-${CARDANO_GET_TOKEN_ADDRESS_NAME}`]: cardanoTool(new CardanoGetTokenAddressAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
}