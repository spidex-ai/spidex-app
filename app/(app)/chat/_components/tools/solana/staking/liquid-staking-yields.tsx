import React from 'react'
import { useChat } from '@/app/(app)/chat/_contexts/chat';
import ToolCard from '../../tool-card';
import { Card } from '@/components/ui';

import type { ToolInvocation } from 'ai';
import type { LiquidStakingYieldsResultBodyType, LiquidStakingYieldsResultType } from '@/ai';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const LiquidStakingYieldsTool: React.FC<Props> = ({ tool, prevToolAgent }) => {
    return (
        <ToolCard 
            tool={tool}
            loadingText={`Getting Best Liquid Staking Yields...`}   
            result={{
                heading: (result: LiquidStakingYieldsResultType) => result.body 
                    ? `Fetched Best Liquid Staking Yields`
                    : "No staking yields found",
                body: (result: LiquidStakingYieldsResultType) => result.body 
                    ? <LiquidStakingYields body={result.body} /> 
                    : "No staking yields found"
            }}
            prevToolAgent={prevToolAgent}
            className="w-full"
        />
    )
}

const LiquidStakingYields: React.FC<{ body: LiquidStakingYieldsResultBodyType }> = ({ body }) => {
    const { sendMessage } = useChat();

    const handleStakeClick = (symbol: string) => {
        sendMessage(`I want to stake SOL using ${symbol}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {
                body.map((item) => (
                    <Card 
                        key={item.name}
                        className="flex flex-row gap-2 items-center p-2 cursor-pointer hover:border-brand-600 dark:hover:border-brand-600 transition-all duration-300"
                        onClick={() => handleStakeClick(item.tokenData.symbol)}
                    >
                        <img 
                            src={item.tokenData.logoURI} 
                            alt={item.name} 
                            className="w-6 h-6 rounded-full" 
                        />
                        <div className="flex flex-col">
                            <p className="text-sm font-bold">{item.name} ({item.tokenData.symbol})</p>
                            <p>{item.yield.toFixed(2)}%</p>
                        </div>
                    </Card>
                ))
            }
        </div>
    )
}

export default LiquidStakingYieldsTool;
