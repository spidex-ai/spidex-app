export interface TopTraderByToken {
    tokenAddress: string;
    owner: string;
    tags: string[];
    type: string;
    volume: number;
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
