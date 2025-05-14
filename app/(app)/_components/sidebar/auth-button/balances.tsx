'use client'

import React from 'react'

import { Skeleton } from '@/components/ui';

import { usePortfolioToken } from '@/hooks/portfolio';

interface Props {
    address: string;
}

const Balances: React.FC<Props> = ({ address }) => {

    const { data: portfolio, loading } = usePortfolioToken(address);

    if (loading) return (
        <Skeleton className="h-10 w-full" />
    )

    return (
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto px-2">
           
   
           {
                portfolio ? (
                    portfolio.amount.length > 0 ? (
                        portfolio.amount.map((token, index) => (
                            <div key={`token-${index}`} className="flex flex-row items-center gap-2">
                            <img 
                                src={token.logo}
                                alt={token.name}
                                className="w-6 h-6 rounded-full" 
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                    {token.name}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {token.quantity}
                                </span>
                            </div>
                        </div>
                        ))
                    ) : (
                        <p>No tokens found.</p>
                    )
                ) : (
                    <p>Error fetching your balances.</p>
                )
            }
        </div>
    )
}

export default Balances;