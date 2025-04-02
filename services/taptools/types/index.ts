// Type definitions for Taptools API responses
export interface TokenPrice {
    [unit: string]: number;
}

export interface TokenPriceChange {
    '5m'?: number;
    '1h'?: number;
    '4h'?: number;
    '24h'?: number;
    '7d'?: number;
    '30d'?: number;
}

export interface TokenMcap {
    ticker: string;
    circSupply: number;
    totalSupply: number;
    price: number;
    mcap: number;
    fdv: number;
}

export interface TokenQuote {
    price: number;
}

export interface TokenHolders {
    holders: number;
}

export interface TokenHolder {
    address: string;
    amount: number;
}

export interface TokenPool {
    tokenA: string;
    tokenATicker: string;
    tokenB: string;
    tokenBTicker: string;
    lpTokenUnit: string;
    onchainID: string;
    tokenALocked: number;
    tokenBLocked: number;
    exchange: string;
}

export interface TokenOHLCV {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface TokenTrade {
    action: string
    address: string
    exchange: string
    hash: string
    lpTokenUnit: string
    price: number
    time: number
    tokenA: string
    tokenAAmount: number
    tokenAName: string
    tokenB: string
    tokenBAmount: number
    tokenBName: string
}

export interface TokenTradingStats {
    buyers: number;
    sellers: number;
    buyVolume: number;
    sellVolume: number;
    buys: number;
    sells: number;
}

export interface TokenLinks {
    description?: string;
    discord?: string;
    email?: string;
    facebook?: string;
    github?: string;
    instagram?: string;
    medium?: string;
    reddit?: string;
    telegram?: string;
    twitter?: string;
    website?: string;
    youtube?: string;
}

export interface TopToken {
    unit: string;
    ticker: string;
    price: number;
    volume: number;
}

export interface TopTokenMcap extends TopToken {
    mcap: number;
    fdv: number;
    circSupply: number;
    totalSupply: number;
}

export interface TopTokenLiquidity extends TopToken {
    liquidity: number;
}

export interface NFTCollectionInfo {
    name: string;
    logo: string;
    supply: number;
    twitter?: string;
    discord?: string;
    website?: string;
    description?: string;
}

export interface NFTCollectionStats {
    volume: number;
    supply: number;
    price: number;
    owners: number;
    listings: number;
    topOffer?: number;
    sales?: number;
}

export interface NFTCollectionStatsExtended extends NFTCollectionStats {
    volumePctChg: number;
    pricePctChg: number;
    ownersPctChg: number;
    listingsPctChg: number;
    salesPctChg?: number;
}

export interface NFTAssetStats {
    timesListed: number;
    owners: number;
    sales: number;
    volume: number;
    lastSoldTime: number;
    lastSoldPrice: number;
    lastListedTime: number;
    lastListedPrice: number;
    isListed: boolean;
}

export interface NFTAssetTrait {
    category: string;
    name: string;
    rarity: number;
    price: number;
}

export interface NFTAssetTraits {
    rank: number;
    traits: NFTAssetTrait[];
}

export interface NFTCollectionTradesStats {
    volume: number;
    sales: number;
    buyers: number;
    sellers: number;
}

export interface NFTCollectionListings {
    listings: number;
    supply: number;
}

export interface NFTCollectionOHLCV {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface NFTCollectionTrade {
    name: string;
    price: number;
    market: string;
    time: number;
    image: string;
    buyerAddress: string;
    sellerAddress: string;
    policy: string;
    collectionName: string;
    hash: string;
}

export interface NFTMarketStats {
    activeAddresses: number;
    dexVolume: number;
}

export interface NFTMarketStatsExtended extends NFTMarketStats {
    volumePctChg: number;
    salesPctChg: number;
    addressesPctChg: number;
    buyersPctChg: number;
    sellersPctChg: number;
}

export interface AddressInfo {
    address: string;
    assets: AssetInfo[];
    lovelace: string;
    paymentCred: string;
    stakeAddress: string;
}

export interface AssetInfo {
    quantity: string;
    unit: string;
}


export interface AddressUtxo {
    assets: AssetInfo[];
    hash: string;
    index: number;
    lovelace: string;
}