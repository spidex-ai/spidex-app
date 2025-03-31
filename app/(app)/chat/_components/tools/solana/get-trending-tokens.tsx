import React from 'react'

import { Card } from '@/components/ui';

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { GetTrendingTokensResultBodyType, GetTrendingTokensResultType } from '@/ai';
import type { TrendingToken } from '@/services/birdeye/types';
import SaveToken from '@/app/(app)/_components/save-token';
import Link from 'next/link';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const GetTrendingTokens: React.FC<Props> = ({ tool, prevToolAgent }) => {
    

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Getting Trending Tokens...`}
            result={{
                heading: (result: GetTrendingTokensResultType) => result.body 
                    ? `Fetched Trending Tokens`
                    : `Failed to fetch trending tokens`,
                body: (result: GetTrendingTokensResultType) => result.body 
                    ? <TrendingTokens body={result.body} />
                    :  "No trending tokens found"
            }}
            defaultOpen={true}
            prevToolAgent={prevToolAgent}
            className="w-full"
        />
    )
}

const TrendingTokens = ({ body }: { body: GetTrendingTokensResultBodyType }) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {body.tokens.map((token: TrendingToken) => (
                <TokenCard
                    key={token.address} 
                    token={token} 
                />
            ))}
        </div>
    )
}

const TokenCard = ({ token }: { token: TrendingToken }) => {
    return (
        <Link href={`/token/${token.address}`}>
            <Card className="flex flex-col gap-2 p-2 justify-center hover:border-brand-600 dark:hover:border-brand-600 transition-all duration-300">
                <div className="flex flex-row items-center gap-2 justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <img 
                            src={token.logoURI} 
                            alt={token.name} 
                            className="w-10 h-10 rounded-full" 
                        />
                        <div className="flex flex-col">
                            <p className="text-sm font-bold">{token.name} ({token.symbol})</p>
                            <p className="text-xs text-muted-foreground">${token.price.toLocaleString(undefined, { maximumFractionDigits: 5})} <span className={token.price24hChangePercent > 0 ? 'text-green-500' : 'text-red-500'}>({token.price24hChangePercent > 0 ? '+' : ''}{token.price24hChangePercent.toLocaleString(undefined, { maximumFractionDigits: 2 })}%)</span></p>
                        </div>
                    </div>
                    <SaveToken address={token.address} />
                </div>
                <div className="flex flex-col">
                    <p className="text-xs text-muted-foreground">24h Volume: ${token.volume24hUSD.toLocaleString()}</p>
                </div>
            </Card>
        </Link>
    )
}

export default GetTrendingTokens;