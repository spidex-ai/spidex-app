'use client'
import React from 'react'

import TrendingTokenCard from './trending-token-card';

import { useTokenTopMcap } from '@/hooks/queries/token/use-token-trending';
import { Skeleton } from '@/components/ui';

const TrendingTokens: React.FC =  () => {

    const { data, isLoading } = useTokenTopMcap(1, 10);
    console.log('data:::', data);

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Trending Tokens</h2>
            {
                isLoading ? (
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {data.map((token) => (
                        <TrendingTokenCard key={token.unit} token={token} />
                    ))}
                </div>
                )
            }
        </div>
    )
}

export default TrendingTokens