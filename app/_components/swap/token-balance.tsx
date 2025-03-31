'use client'

import React from 'react'

import { Wallet } from 'lucide-react'

import { Button, Skeleton } from '@/components/ui'

import { useTokenBalance } from '@/hooks'

interface Props {
    address: string
    tokenAddress: string
    tokenSymbol: string,
    setAmount?: (amount: string) => void,
    digits?: number
}

const TokenBalance: React.FC<Props> = ({ address, tokenAddress, tokenSymbol, setAmount, digits = 2 }) => {

    const { balance, isLoading } = useTokenBalance(tokenAddress, address);

    if (isLoading) return <Skeleton className="w-16 h-4" />;

    return (
        <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
            <Wallet className="w-3 h-3" />
            <p className="text-xs">
                {balance.toLocaleString(undefined, { maximumFractionDigits: digits })} {tokenSymbol}
            </p>
            {
                setAmount && (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="text-[10px] px-1 py-0.5 h-fit w-fit"
                            onClick={() => setAmount((balance / 2).toString())}
                        >
                            Half
                        </Button>
                        <Button
                            variant="outline"
                            className="text-[10px] px-1 py-0.5 h-fit w-fit"
                            onClick={() => setAmount(balance.toString())}
                        >
                            Max
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

export default TokenBalance