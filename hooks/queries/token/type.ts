export interface TopTraderByToken {
    address: string;
    totalVolume: number;
    buyVolume: number;
    sellVolume: number;
    netVolume: number;
}

export interface TokenTopHolders {
    address: string;
    amount: number; 
    ownershipPercentage: number;
    totalPrice: number;
    usdTotalPrice: number;
}

export interface TokenTopTraders {
    items: TopTraderByToken[];
}


export interface TokenTradeHistory {
    action: string;
    address: string;
    exchange: string; 
    hash: string;
    lpTokenUnit: string;
    price: number;
    time: number;
    tokenA: string;
    tokenAAmount: number;
    tokenAName: string; 
    tokenB: string;
    tokenBAmount: number;
    tokenBName: string;
    totalPrice: number;
    usdTotalPrice: number;

}

export interface TokenTradeHistoryItem {
    address: string;
}
