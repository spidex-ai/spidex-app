import React from 'react'

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { CardanoAllBalancesResultType } from '@/ai';
import { TokenBalance } from '../utils';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const AllBalances: React.FC<Props> = ({ tool, prevToolAgent }) => {
    

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Getting All Balances...`}
            result={{
                heading: (result: CardanoAllBalancesResultType) => result.body 
                    ? `Fetched All Balances`
                    : `Failed to fetch balances`,
                body: (result: CardanoAllBalancesResultType) => result.body 
                    ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {result.body.amount.map((balance) => (
                                <TokenBalance
                                    key={balance.unit}
                                    token={balance.ticker}
                                    balance={Number(balance.quantity)}
                                    logoURI={balance.logo!}
                                    name={balance.name}
                                />
                            ))}
                        </div>
                    )
                    :  "No balance found"
            }}
            prevToolAgent={prevToolAgent}
        />
    )
}

export default AllBalances;