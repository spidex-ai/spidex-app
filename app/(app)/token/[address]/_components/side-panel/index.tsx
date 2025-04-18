'use client'
import React from 'react'

import { ArrowLeftRight, MessageSquare } from 'lucide-react';

import { Tabs, TabsList, TabsContent, TabsTriggerGradient, Skeleton } from '@/components/ui';

import Swap from '@/app/_components/swap';

import Chat from './chat';

import { ChatProvider } from '../../_contexts';

import type { TokenChatData } from '@/types';

import { CardanoTokenDetail } from '@/services/dexhunter/types';
import { adaTokenDetail } from '@/app/(app)/chat/_components/tools/utils/swap/swap';
import { useSearchParams } from 'next/navigation';
interface Props {
    data: CardanoTokenDetail | null;
    isLoadingTokenDetail: boolean;
}

const SidePanel: React.FC<Props> =  ({ data: tokenDetail, isLoadingTokenDetail }) => {
    const searchParams = useSearchParams();
    console.log('================>>>>>>>>>>>>>tokenDetail', tokenDetail);

    if(isLoadingTokenDetail) {
        return <Skeleton className="h-[100px] w-full" />
    }
    
    const tokenChatData: TokenChatData = {
        address: tokenDetail?.token_id ?? '',
        name: tokenDetail?.token_ascii ?? '',
        symbol: tokenDetail?.ticker ?? '',
        decimals: tokenDetail?.decimals ?? 0,
        extensions: {},
        logoURI: tokenDetail?.logo ?? '',
        supply: 10000,
        circulatingSupply: 10000
    }



    const isTradeTab = searchParams.get('tab') === 'trade';


    return (
        <Tabs className="h-full flex flex-col items-start w-full max-w-full" defaultValue={isTradeTab ? 'trade' : 'chat'}>
            <TabsList className="p-0 h-[44px] justify-start bg-neutral-100 dark:bg-bg-secondary w-full max-w-full overflow-x-auto rounded-none no-scrollbar">
                <TabsTriggerGradient 
                    value="chat"
                    className="h-full"
                >
                    <MessageSquare className="w-4 h-4" />
                    Chat
                </TabsTriggerGradient>
                <TabsTriggerGradient 
                    value="trade"
                    className="h-full"
                >
                    <ArrowLeftRight className="w-4 h-4" />
                    Trade
                </TabsTriggerGradient>
            </TabsList>
            <div className="flex-1 h-0 overflow-y-auto w-full no-scrollbar">
                <TabsContent value="chat" className="h-full m-0 p-2">
                    <ChatProvider token={tokenChatData}>
                        <Chat token={tokenChatData} />
                    </ChatProvider>
                </TabsContent>
                <TabsContent value="trade" className="h-full m-0 p-2">
                    <Swap 
                        initialInputToken={adaTokenDetail}
                        initialOutputToken={tokenDetail}
                        inputLabel="Sell"
                        outputLabel="Buy"
                        className="w-full"
                    />
                </TabsContent>
            </div>
        </Tabs>
    )
}

export default SidePanel;