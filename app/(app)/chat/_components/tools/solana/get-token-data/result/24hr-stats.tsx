"use client"

import React from 'react'

import { Card } from '@/components/ui'

import BuySell from '../../../utils/buy-sell'

import type { TokenOverview } from '@/services/birdeye/types'
import { TokenStats } from '@/services/taptools/types'

interface Props {
    token: TokenStats
}

const TwentyFourHrStats: React.FC<Props> = ({ token }) => {
    return (
        <Card className='p-2 flex flex-col gap-2'>
            <h2 className="text-lg font-semibold">
                Volume (24hr)
            </h2>
            <BuySell
                buy={token['24h'].buyVolume}
                sell={token['24h'].sellVolume}
                prefix="$"
            />
            <div className="flex flex-col">
                <h3 className="text-sm font-semibold">
                    Unique Traders
                </h3>
                <p>{(token['24h'].buyers + token['24h'].sellers).toLocaleString()} Traders</p>
            </div>
        </Card>
    )
}

export default TwentyFourHrStats