
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
    ticket: "ADA";
    name: "Cardano";
    totalPrice: number; 
    usdPrice: number;
    usdTotalPrice: number;
    logo: string;
}

export interface PortfolioTransaction {
    txHash: string;
    txIndex: number;
    blockHeight: number;
    blockTime: number;
}
