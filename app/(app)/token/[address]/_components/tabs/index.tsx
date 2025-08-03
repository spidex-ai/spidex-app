'use client';

import React, { useRef, useEffect } from 'react';

import { Tabs, TabsTrigger, TabsContent } from '@/components/ui';
import DraggableTabsList from './draggable-tabs-list';

import TopHolders from './top-holders';
import MarketStats from './market-stats';
import { CardanoTokenDetail } from '@/services/dexhunter/types';
import TradeHistory from './trade-history';
import { useIsMobile } from '@/hooks';

interface Props {
  address: string;
  data: CardanoTokenDetail | null;
  isLoadingTokenDetail: boolean;
}

const TokenDashboardTabs: React.FC<Props> = ({
  data,
  isLoadingTokenDetail,
}) => {
  const [activeTab, setActiveTab] = React.useState('market-stats');
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement }>({});
  const isMobile = useIsMobile();

  const scrollToTab = (value: string) => {
    if (isMobile) return;
    const tab = tabsRef.current[value];
    if (tab) {
      tab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  useEffect(() => {
    scrollToTab(activeTab);
  }, [activeTab]);
  return (
    <div className="p-2 h-full flex flex-col w-full sm:min-w-[720px]">
      <Tabs
        className="h-full flex flex-col items-start w-full sm:max-w-full overflow-hidden"
        defaultValue="market-stats"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        {/* Fixed header section */}
        <div className="flex gap-4 sticky top-0 z-10 pb-2">
          <div className="flex items-center gap-1 px-4 py-1 bg-bg-tab rounded-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-[ping_3s_ease-in-out_infinite] absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 border-2 border-red-500"></span>
            </span>
            <span className="text-xs">Live</span>
          </div>
          <DraggableTabsList
            selectedTab={activeTab}
            className="p bg-neutral-100 dark:bg-bg-tab rounded-md"
          >
            <TabsTrigger
              value="market-stats"
              ref={el => {
                if (el) tabsRef.current['market-stats'] = el;
              }}
              className="min-w-fit whitespace-nowrap data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:rounded-l-md"
            >
              Stats
            </TabsTrigger>
            <TabsTrigger
              value="holders"
              ref={el => {
                if (el) tabsRef.current['holders'] = el;
              }}
              className="min-w-fit whitespace-nowrap data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800"
            >
              Trade History
            </TabsTrigger>

            <TabsTrigger
              value="bubble"
              ref={el => {
                if (el) tabsRef.current['bubble'] = el;
              }}
              className="min-w-fit whitespace-nowrap data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:rounded-r-md"
            >
              Holders
            </TabsTrigger>
          </DraggableTabsList>
        </div>

        {/* Scrollable content section */}
        <div className="flex-1 w-full mt-1 overflow-hidden">
          <TabsContent
            value="market-stats"
            className="h-full m-0 p-2 overflow-y-auto"
          >
            <MarketStats
              tokenId={data?.unit}
              tokenName={data?.ticker}
              isLoadingTokenDetail={isLoadingTokenDetail}
            />
          </TabsContent>
          <TabsContent value="holders" className="h-full m-0 overflow-y-auto">
            <TradeHistory
              tokenId={data?.unit || ''}
              ticker={data?.ticker || ''}
            />
          </TabsContent>

          <TabsContent value="bubble" className="h-full m-0 overflow-y-auto">
            <TopHolders tokenId={data?.unit || ''} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TokenDashboardTabs;
