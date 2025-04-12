import React, { useEffect, useState } from 'react'

import Image from 'next/image';

import { Button, Card } from '@/components/ui';

import WalletAddress from '@/app/_components/wallet-address';

import ToolCard from '../tool-card';

import { getStreamsByMint } from '@/services/streamflow';

import type { ToolInvocation } from 'ai';
import type { TopHolderBodyType, TopHolderNewResultType, TopHoldersResultBodyType, TopHoldersResultType } from '@/ai';
import type { TokenLargestAccount } from '@/services/helius';
import type { Stream } from '@streamflow/stream';
import type { ProgramAccount } from '@project-serum/anchor';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const GetTopHolders: React.FC<Props> = ({ tool, prevToolAgent }) => {
    

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Getting Top Holders...`}
            result={{
                heading: (result: TopHolderNewResultType) => result.body 
                    ? `Fetched Top 20 Holders`
                    : `Failed to fetch top holders`,
                body: (result: TopHolderNewResultType) => result.body 
                    ? <TopHolders body={result.body} mint={tool.args.tokenAddress} />
                    :  "No top holders found"
            }}
            defaultOpen={true}
            prevToolAgent={prevToolAgent}
        />
    )
}

const TopHolders = ({ body,mint }: { body: TopHolderBodyType, mint : string }) => {

    const [showAll, setShowAll] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            <p className="text-md">
                {(body.percentageOwned * 100).toFixed(2)}% of the total supply is owned by the top 20 holders
            </p>
            <div className="flex flex-col gap-2">
                {body.topHolders.slice(0, showAll ? body.topHolders.length : 5).map((topHolder, index) => (
                    <TopHolder
                        key={topHolder.address} 
                        topHolder={topHolder}
                        index={index}
                    />
                ))}
            </div>
            <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
            >
                {showAll ? "Show Less" : "Show All"}
            </Button>
        </div>
    )
}

const TopHolder = ({ topHolder, index }: { topHolder: (TokenLargestAccount & { percentageOwned: number, owner: string }), index: number }) => {
    return (
        <Card className="flex flex-row items-center gap-2 p-2">
            <p className="text-sm text-muted-foreground">
                {index + 1}
            </p>
            <p className="text-xs">{topHolder.address}</p>
                <p className="text-xs">{topHolder.amount ? topHolder.amount.toLocaleString() : "0"} ({topHolder.percentageOwned.toFixed(2)}%)</p>
        </Card>
    )
}

export default GetTopHolders;