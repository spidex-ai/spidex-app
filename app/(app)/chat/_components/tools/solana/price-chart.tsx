import React, { useState } from 'react'

import { Skeleton } from '@/components/ui';

import TokenChart from '@/app/(app)/_components/token/chart';

import ToolCard from '../tool-card';

import { useTokenDetail } from '@/hooks';

import type { ToolInvocation } from 'ai';
import type { TokenPriceChartResultType } from '@/ai';
import Header from '@/app/(app)/token/[address]/_components/header';
import { QuoteType } from '@/app/(app)/token/[address]/_components/header/select-quote';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const PriceChart: React.FC<Props> = ({ tool, prevToolAgent }) => {
    return (
        <ToolCard 
            tool={tool}
            loadingText={`Getting Token Price Chart...`}
            result={{
                heading: (result: TokenPriceChartResultType) => result.body 
                    ? `Fetched Token Price Chart` 
                    : `Failed to fetch token price chart`,
                body: (result: TokenPriceChartResultType) => result.body 
                    ? <PriceChartBody tokenAddress={tool.args.tokenAddress} /> 
                    : "No token price chart found"
            }}
            prevToolAgent={prevToolAgent}
            className="w-full"
        />
    )
}

const PriceChartBody = ({ tokenAddress }: { tokenAddress: string }) => {
    

    const {data, isLoading} = useTokenDetail(tokenAddress);
    const [quote, setQuote] = useState<QuoteType>(QuoteType.USD);

    return (
        <div className="w-full flex flex-col gap-2">
            {
                isLoading ? (
                    <Skeleton className="w-full h-8" />
                ) : (
                    data && (
                        <Header data={data} isLoading={isLoading} quote={quote} onQuoteChange={setQuote} />
                    )
                )
            }
            <div className="h-96">
                <TokenChart data={data} isLoadingTokenDetail={isLoading} quote={quote} />
            </div>
               
       
        </div>
    )
}

export default PriceChart;