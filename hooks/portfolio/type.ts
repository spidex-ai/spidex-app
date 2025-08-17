export interface PortfolioToken {
  address: string;
  amount: TokenAmount[];
  stakeAddress: string;
  type: string;
  script: boolean;
  totalPrice: number;
  totalUsdPrice: number;
}

export interface TokenAmount {
  unit: string;
  quantity: string;
  decimals: number;
  has_nft_onchain_data: boolean;
  price: number;
  ticket: 'ADA';
  name: 'Cardano';
  totalPrice: number;
  usdPrice: number;
  usdTotalPrice: number;
  logo: string;
}

export interface PortfolioTransaction {
  action: string;
  time: number;
  hash: string;
  tokenA: string;
  tokenAName: string;
  tokenAIcon?: string;
  tokenAAmount: number;
  tokenB: string;
  tokenBName: string;
  tokenBAmount: number;
  tokenBIcon?: string;
}
