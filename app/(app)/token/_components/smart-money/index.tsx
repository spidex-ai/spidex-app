'use client'
import React from 'react'

// import SmartMoneyTokenCard from './smart-money-token-card';

// import { getPrices, getTokenMetadata } from '@/services/birdeye'
// import { getSmartMoneyInflows } from '@/services/hellomoon';

// import { Granularity, SmartMoneyTokenInflow } from '@/services/hellomoon/types';
// import { Price, TokenMetadata } from '@/services/birdeye/types';
import { useTokenTrending } from '@/hooks/queries/token/use-token-trending';
import TrendingTokenCard from '../trending-tokens/trending-token-card';

const SmartMoneyTokens: React.FC = () => {

    const { data } = useTokenTrending();

    // const tokens = await getSmartMoneyInflows(Granularity.ONE_DAY, 9).catch((error) => {
    //     console.error(error);
    //     return [];
    // });

    // const [prices, tokenMetadatas] = await Promise.all([
    //     getPrices(tokens.map((token) => token.mint))
    //         .then((prices) => {
    //             return tokens.map((token) => {
    //                 return prices[token.mint]
    //             });
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             return [];
    //         }),
    //     Promise.all(tokens.map(async (token) => {
    //         const tokenMetadata = await getTokenMetadata(token.mint).catch((error) => {
    //             console.error(error);
    //             return null;
    //         });
    //         return tokenMetadata;
    //     })),
    // ]);

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Smart Money Inflows</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {data.map((token) => (
                    <TrendingTokenCard key={token.unit} token={token} />
                ))}
            </div>
        </div>
    )
}

export default SmartMoneyTokens