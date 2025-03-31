'use client'

import React from 'react'

import { 
    LiquidityAnalysis, 
    NumMentions, 
    PriceAnalysis, 
    TopHolders 
} from './tools';

import { 
    SOLANA_TOKEN_PAGE_LIQUIDITY_NAME, 
    SOLANA_TOKEN_PAGE_PRICE_ANALYSIS_NAME, 
    SOLANA_TOKEN_PAGE_TOP_HOLDERS_NAME, 
    TOKEN_PAGE_NUM_MENTIONS_NAME 
} from '@/ai/action-names';

import type { ToolInvocation } from 'ai'
import type { TokenChatData } from '@/types';

interface Props {
    tool: ToolInvocation,
    token: TokenChatData
}

const Tool: React.FC<Props> = ({ tool, token }) => {

    switch (tool.toolName) {
        case SOLANA_TOKEN_PAGE_TOP_HOLDERS_NAME:
            return <TopHolders tool={tool} />;
        case TOKEN_PAGE_NUM_MENTIONS_NAME:
            return <NumMentions tool={tool} />;
        case SOLANA_TOKEN_PAGE_LIQUIDITY_NAME:
            return <LiquidityAnalysis tool={tool} />;
        case SOLANA_TOKEN_PAGE_PRICE_ANALYSIS_NAME:
            return <PriceAnalysis tool={tool} token={token} />;
        default:
            return <pre>{JSON.stringify(tool, null, 2)}</pre>;
    }
}

export default Tool