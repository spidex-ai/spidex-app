import { CARDANO_GET_POOLS_NAME } from "../get-pools/name";

export const CARDANO_DEPOSIT_LIQUIDITY_PROMPT = 
`Deposit liquidity into a Raydium pool.

Required parameters:
- poolId: The pool ID to deposit liquidity into

Optional parameters:
- amount: The amount of liquidity to deposit

You can call the ${CARDANO_GET_POOLS_NAME} to get the pools for a given token.`; 