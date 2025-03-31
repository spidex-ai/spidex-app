export interface DexScreenerPair {
    chainId: string;
    dexId: "raydium" | "orca" | "meteora";
    url: string;
    pairAddress: string;
    baseToken: {
        address: string;
        name: string;
        symbol: string;
    };
    quoteToken: {
        address: string;
        name: string;
        symbol: string;
    };
    priceNative: string;
    priceUsd?: string;
    txns?: {
        m5: {
            buys: number;
            sells: number;
        };
        h1: {
            buys: number;
            sells: number;
        };
        h6: {
            buys: number;
            sells: number;
        };
        h24: {
            buys: number;
            sells: number;
        };
    };
    volume?: {
        m5: number;
        h1: number;
        h6: number;
        h24: number;
    };
    priceChange?: {
        h1: number;
        h6: number;
        h24: number;
    };
    liquidity?: {
        usd: number;
        base: number;
        quote: number;
    };
    fdv?: number;
    info?: {
        imageUrl?: string;
        websites?: {
            url: string;
        }[];
        socials?: {
            type: string;
            url: string;
        }[];
    };
}

export interface DexScreenerResponse {
    pairs: DexScreenerPair[];
} 