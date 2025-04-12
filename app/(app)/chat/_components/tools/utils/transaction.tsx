'use client'

import React from 'react'

import { Card } from '@/components/ui';

interface Props {
    txHash: string,
    txIndex: number,
    blockHeight: number,
    blockTime: number,
}

const Transaction: React.FC<Props> = ({ txHash, txIndex, blockHeight, blockTime }) => {
    return (
        <Card className="flex flex-row items-center gap-2 p-2">
            
            <div className="flex flex-col">
                <p className="text-xs text-neutral-600 dark:text-neutral-400">{txHash}</p>
                <p className="text-md font-bold">{blockHeight}</p>
            </div>
        </Card>
    )
}

export default Transaction