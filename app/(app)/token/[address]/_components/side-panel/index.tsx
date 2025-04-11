'use client'
import React from 'react'

import { ArrowLeftRight, MessageSquare } from 'lucide-react';

import { Tabs, TabsList, TabsContent, TabsTriggerGradient } from '@/components/ui';

import Swap from '@/app/_components/swap';

import Chat from './chat';

import { ChatProvider } from '../../_contexts';

import type { TokenChatData } from '@/types';

import { useTokenDetail } from "@/hooks";
import { CardanoTokenDetail } from '@/services/dexhunter/types';

interface Props {
    address: string;
    data: CardanoTokenDetail | null;
}

const SidePanel: React.FC<Props> =  ({ address, data: tokenDetail }) => {

    const {data} = useTokenDetail(address);

    console.log('================>>>>>>>>>>>>>tokenDetail', tokenDetail);
    



    // If getToken fails, use tokenMetadata to create a token object
    // const tokenData = {
    //     id: data?.token_id,
    //     name: data?.token_ascii,
    //     symbol: data?.ticker,
    //     decimals: data?.decimals,
    //     logoURI: data?.logo,
    //     extensions: {},
    //     tags: [],
    //     freezeAuthority: null,
    //     mintAuthority: null,
    //     permanentDelegate: null
    // } as Token;

    const tokenChatData: TokenChatData = {
        address: data?.token_id ?? '',
        name: data?.token_ascii ?? '',
        symbol: data?.ticker ?? '',
        decimals: data?.decimals ?? 0,
        extensions: {},
        logoURI: data?.logo ?? '',
        supply: 10000,
        circulatingSupply: 10000
    }

    return (
        <Tabs className="h-full flex flex-col items-start w-full max-w-full" defaultValue="chat">
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
                        initialInputToken={null}
                        initialOutputToken={null}
                        // initialOutputToken={tokenData}
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