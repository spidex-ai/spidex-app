export interface SearchTokenInfo {
  token_id: string;
  token_decimals: number;
  token_policy: string;
  token_ascii: string;
  ticker: string;
  is_verified: boolean;
  supply: number;
  creation_date: string;
  price: number;
  usdPrice?: number;
  logo?: string | null;
  unit?: string;
  name?: string;
}

export interface TokenDetail {
  token_id: string;
  token_ascii: string;
  ticker: string;
  is_verified: boolean;
  logo: string;
  total_supply: number;
  decimals: number;
  unit: string;
}

export interface CardanoTokenDetail extends SearchTokenInfo {
  total_supply?: number;
  decimals?: number;
  price24hChg?: number;
}

/**
 * Interface for swap transaction payload
 */

export interface EsitmateSwapPayload {
  tokenIn: string;
  tokenOut: string;
  slippage: number;
  amountIn: number;
  blacklistedDexes: string[];
}
export interface SwapPayload {
  addresses: string[];
  tokenIn: string;
  tokenOut: string;
  slippage: number;
  amountIn: number;
  txOptimization: boolean;
  blacklistedDexes: string[];
}

export interface SwapRequestDexHunterPayload {
  addresses: string[];
  tokenIn: string;
  tokenOut: string;
  slippage: number;
  amountIn: number;
  txOptimization: boolean;
  blacklistedDexes: string[];
}

export interface SwapRequestMinswapPayload {
  sender: string;
  min_amount_out: string;
  estimate: {
    amount: string;
    token_in: string;
    token_out: string;
    slippage: number;
  }
}

export interface BuildSwapResponse {
  cbor: string;
  splits: Split[];
  average_price: number;
  total_fee: number;
  total_output: number;
  deposits: number;
  total_output_without_slippage: number;
  possible_routes: PossibleRoutes;
  dexhunter_fee: number;
  batcher_fee: number;
  total_input: number;
  total_input_without_slippage: number;
  net_price: number;
  net_price_reverse: number;
  partner_fee: number;
  communications: any[];
  partner_code: string;
}

export interface Split {
  amount_in: number;
  expected_output: number;
  expected_output_without_slippage: number;
  fee: number;
  dex: string;
  price_impact: number;
  initial_price: number;
  final_price: number;
  pool_id: string;
  batcher_fee: number;
  deposits: number;
  price_distortion: number;
  pool_fee: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PossibleRoutes {}

export interface SubmitSwapPayload {
  txCbor: string;
  signatures: string;
}
export interface SubmitSwapResponse {
  cbor: string;
  strat_id: string;
}

export interface IPath {
  amountIn: string;
  amountOut: string; 
  batcherFee: string; 
  minReceive: string;
  poolId: string;
  priceImpact: number;
  protocol: string;
  refundableDeposits: string;
}
export interface IFeeEstimate {
  dexDeposits: string;
  dexFee: string;
  minReceive: string;
  netPrice: string;
  totalDeposits: string;
  paths: IPath[];
}
export interface EsitmateSwapResponse {
  estimatedPoint: string;
  dexhunter: IFeeEstimate;
  minswap: IFeeEstimate; 

}

export interface PoolStatsResponse {
  dex_name: string;
  token_1_amount: number;
  token_2_amount: number;
}
