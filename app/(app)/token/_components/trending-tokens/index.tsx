'use client'
import React from 'react'

import TrendingTokenCard from './trending-token-card';

import { useTokenTrending } from '@/hooks/queries/token/use-token-trending';

const TrendingTokens: React.FC =  () => {

    const { data } = useTokenTrending();
    console.log(data);

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Trending Tokens</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {data.map((token) => (
                    <TrendingTokenCard key={token.unit} token={token} />
                ))}
            </div>
        </div>
    )
}

export default TrendingTokens