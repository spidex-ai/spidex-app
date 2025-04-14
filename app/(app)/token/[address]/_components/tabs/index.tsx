'use client'

import React, { useRef, useEffect } from 'react'

import { Tabs, TabsTrigger, TabsContent } from '@/components/ui'
import DraggableTabsList from './draggable-tabs-list'

import TopHolders from './top-holders';
import TopTraders from './top-traders';
// import BubbleMap from './bubble-map';

// import TokenMarkets from './markets'
// import TokenUsersOverTime from './users-over-time'
import MarketStats from './market-stats'
import { CardanoTokenDetail } from '@/services/dexhunter/types'
import Image from 'next/image'
import TradeHistory from './trade-history'

interface Props {
    address: string;
    data: CardanoTokenDetail | null;
    isLoadingTokenDetail: boolean;
}

const TokenDashboardTabs: React.FC<Props> = ({ address, data, isLoadingTokenDetail }) => {
    const [activeTab, setActiveTab] = React.useState('market-stats')
    const tabsRef = useRef<{ [key: string]: HTMLButtonElement }>({})

    const scrollToTab = (value: string) => {
        const tab = tabsRef.current[value]
        if (tab) {
            tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
        }
    }

    useEffect(() => {
        scrollToTab(activeTab)
    }, [activeTab])

    return (
        <div className='p-2'>
           <Tabs 
            className="h-full flex flex-col items-start w-full max-w-full" 
            defaultValue="market-stats"
            value={activeTab}
            onValueChange={setActiveTab}
        >
            <div className='flex gap-4'>
            <div className='flex items-center gap-1 px-4 py-1 bg-bg-tab rounded-md'>
                <Image src="/icons/red-dot.svg" alt="Live" width={6} height={6} />
                <span className='text-xs'>Live</span>
            </div>
            <DraggableTabsList selectedTab={activeTab}  className="p bg-neutral-100 dark:bg-bg-tab">
                <TabsTrigger 
                    value="market-stats"
                    ref={(el) => {
                        if (el) tabsRef.current['market-stats'] = el
                    }}
                    className="min-w-fit whitespace-nowrap data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800"
                >
                   
                    Stats
                </TabsTrigger>
                <TabsTrigger 
                    value="holders"
                    ref={(el) => {
                        if (el) tabsRef.current['holders'] = el
                    }}
                    className="min-w-fit whitespace-nowrap data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800"
                >
                   
                    Trade History
                </TabsTrigger>
                <TabsTrigger 
                    value="traders"
                    ref={(el) => {
                        if (el) tabsRef.current['traders'] = el
                    }}
                    className="min-w-fit whitespace-nowrap data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800"
                >
                  
                    Top Traders
                </TabsTrigger>
                <TabsTrigger 
                    value="bubble"
                    ref={(el) => {
                        if (el) tabsRef.current['bubble'] = el
                    }}
                    className="min-w-fit whitespace-nowrap data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800"
                >
                 
                    Holders
                </TabsTrigger>
            </DraggableTabsList>
            </div>
            <div className="flex-1 h-0 overflow-y-auto w-full no-scrollbar mt-2">
                <TabsContent value="market-stats" className="h-full m-0 p-2">
                    <MarketStats tokenId={data?.token_id} tokenName={data?.ticker} isLoadingTokenDetail={isLoadingTokenDetail} />
                </TabsContent>
                <TabsContent value="holders" className="h-full m-0">
                    <TradeHistory tokenId={data?.token_id || ''} ticker={data?.ticker || ''} />
                </TabsContent>
                <TabsContent value="traders" className="h-full m-0">
                    <TopTraders address={address} />
                </TabsContent> 
                <TabsContent value="bubble" className="h-full m-0 p-2">
                    <TopHolders tokenId={data?.token_id || ''} />
                </TabsContent>
            </div>
        </Tabs>
      
        </div>
    )
}

export default TokenDashboardTabs