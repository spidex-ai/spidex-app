'use client'

import React from 'react'

import { Skeleton } from '@/components/ui'

import TokenSelect from '@/app/_components/token-select'
import TokenDisplay from '@/app/_components/token-display'

import TokenBalance from './token-balance'

import { usePrice } from '@/hooks/queries/price'

import { cn } from '@/lib/utils'

import { SearchTokenInfo } from '@/services/dexhunter/types'

interface Props {
    label: string,
    amount: string,
    onChange?: (amount: string) => void,
    token: SearchTokenInfo | null,
    onChangeToken?: (token: SearchTokenInfo | null) => void,
    address?: string,
    priorityTokens?: string[]
}

const TokenInput: React.FC<Props> = ({ label, amount, onChange, token, onChangeToken, address, priorityTokens }) => {

    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <div className={cn(
            "flex flex-col border border-transparent rounded-md p-2 w-full transition-colors bg-neutral-100 dark:bg-bg-main gap-2",
            isFocused && "border-brand-600"
        )}>
            <div className="flex items-center justify-between">
                <p className="text-sm font-bold">
                    {label}
                </p>
                {
                    token && address && (
                        <TokenBalance
                            address={address}
                            tokenAddress={token.unit ? token.unit : token.token_id}
                            tokenSymbol={token.name ? token.name : token.token_ascii}
                            setAmount={onChange}
                        />
                    )
                }
            </div>
            <div className={cn(
                "flex items-center w-full",
            )}>
                <div className="w-full">
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (Number(value) >= 0) {
                                if (onChange) {
                                    onChange(value);
                                }
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === '-') {
                                e.preventDefault();
                            }
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        disabled={!onChange}
                        placeholder="0.00"
                    />
                    {
                        token && (
                            <TokenInputValue
                                amount={amount}
                                token={token}
                            />
                        )
                    }
                </div>
                {
                    onChangeToken ? (
                        <TokenSelect
                            value={token}
                            onChange={onChangeToken}
                            priorityTokens={priorityTokens}
                        />
                    ) : (
                        token && (
                            <TokenDisplay token={token} />
                        )
                    )
                }
            </div>
        </div>
    )
}

export const TokenInputValue = ({ amount, token }: { amount: string, token: SearchTokenInfo }) => { 
    return null;
    const { data: price, isLoading: isPriceLoading } = usePrice(token.token_id);
    
    if(isPriceLoading) return <Skeleton className="w-16 h-4" />

    if(!price) return null;

    return (
        <p className="text-[10px] text-neutral-600 dark:text-neutral-400">
            ${((price as any).value * Number(amount)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
    )
}

export default TokenInput