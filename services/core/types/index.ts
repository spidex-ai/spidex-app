export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  metadata: Record<string, any>;
  success: boolean;
  message: string;
}

export interface WalletBalanceAmount {
  unit: string;
  ticker: string;
  name: string;
  quantity: string;
  price: number;
  usdPrice: number;
  totalPrice: number;
  usdTotalPrice: number;
  logo?: string;
}
export interface WalletBalances {
  address: string;
  amount: WalletBalanceAmount[];
  stakeAddress: string;
  type: string;
  script: boolean;
  totalPrice: number;
  totalUsdPrice: number;
}

export interface WalletTransaction {
  txHash: string;
  txIndex: number;
  blockHeight: number;
  blockTime: number;
}
