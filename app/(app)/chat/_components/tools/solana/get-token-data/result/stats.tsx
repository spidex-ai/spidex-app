"use client"

import React from 'react'

import { Card } from '@/components/ui'

// import type { TokenOverview } from '@/services/birdeye/types'
import { TokenStats } from '@/services/taptools/types'

interface Props {
    token: TokenStats;
}

const Stats: React.FC<Props> = ({ token }) => {
    console.log("🚀 ~ token:", token)
    return (
        <Card className='p-2 flex flex-col gap-2'>
            <h2 className="text-lg font-semibold">
                Market Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold">
                        Market Cap
                    </h3>
                    <p>${token?.mcap?.mcap?.toLocaleString() || "N/A"}</p>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold">
                        Circulating Supply
                    </h3>
                    <p>${token?.mcap?.circSupply?.toLocaleString(undefined, { maximumFractionDigits: 2 }) || "N/A"}</p>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold">
                        Total Supply
                    </h3>
                    <p>{token?.mcap?.totalSupply?.toLocaleString(undefined, { maximumFractionDigits: 0 }) || "N/A"}</p>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold">
                        # of Holders
          </h3>
          <p>{token?.holders?.toLocaleString() ?? "N/A"}</p>
        </div>
      </div>
    </Card>
    )
}

export default Stats