'use client'

import React from 'react'

import {
    Balance,
    GetWalletAddress,
    GetTrendingTokens,
    GetTokenData,
    Trade,
    Stake,
    Unstake,
    AllBalances,
    LiquidStakingYields,
    Transfer,
    GetTokenAddress,
    GetTopHolders,
    BubbleMaps,
    GetPools,
    DepositLiquidity,
    NumHolders,
    GetLpTokens,
    WithdrawLiquidity,
    GetTopTraders,
    GetTrades,
    GetTopTokenTraders,
    PriceChart,
    GetSmartMoneyInflows,
} from './solana'
import { SearchRecentTweets } from './twitter'
import { SearchKnowledge } from './knowledge'
import { InvokeAgent } from './invoke'

import { 
    SOLANA_BALANCE_NAME,
    SOLANA_GET_WALLET_ADDRESS_NAME,
    SOLANA_GET_TRENDING_TOKENS_NAME,
    SOLANA_GET_TOKEN_DATA_NAME,
    SOLANA_TRADE_NAME,
    SOLANA_STAKE_NAME,
    SOLANA_UNSTAKE_NAME,
    SOLANA_ALL_BALANCES_NAME,
    TWITTER_SEARCH_RECENT_NAME,
    SEARCH_KNOWLEDGE_NAME,
    SOLANA_LIQUID_STAKING_YIELDS_NAME,
    SOLANA_TRANSFER_NAME,
    SOLANA_GET_TOKEN_ADDRESS_NAME,
    SOLANA_TOP_HOLDERS_NAME,
    SOLANA_BUBBLE_MAPS_NAME,
    SOLANA_TOKEN_HOLDERS_NAME,
    SOLANA_GET_POOLS_NAME,
    INVOKE_AGENT_NAME,
    SOLANA_DEPOSIT_LIQUIDITY_NAME,
    SOLANA_GET_LP_TOKENS_NAME,
    SOLANA_WITHDRAW_LIQUIDITY_NAME,
    SOLANA_GET_TOP_TRADERS_NAME,
    SOLANA_GET_TRADER_TRADES_NAME,
    SOLANA_TOKEN_TOP_TRADERS_NAME,
    SOLANA_TOKEN_PRICE_CHART_NAME,
    SOLANA_GET_SMART_MONEY_INFLOWS_NAME,
} from '@/ai/action-names'

import type { ToolInvocation as ToolInvocationType } from 'ai'

interface Props {
    tool: ToolInvocationType,
    prevToolAgent?: string,
}

const ToolInvocation: React.FC<Props> = ({ tool, prevToolAgent }) => {

    const toolParts = tool.toolName.split("-");
    const toolName = toolParts.slice(1).join("-");
    
    switch(toolName) {
        case SOLANA_BALANCE_NAME:
            return <Balance tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_GET_WALLET_ADDRESS_NAME:
            return <GetWalletAddress tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_GET_TRENDING_TOKENS_NAME:
            return <GetTrendingTokens tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_GET_TOKEN_DATA_NAME:
            return <GetTokenData tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_TRADE_NAME:
            return <Trade tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_LIQUID_STAKING_YIELDS_NAME:
            return <LiquidStakingYields tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_TRANSFER_NAME:
            return <Transfer tool={tool} prevToolAgent={prevToolAgent} />
        case TWITTER_SEARCH_RECENT_NAME:
            return <SearchRecentTweets tool={tool} />
        case SOLANA_STAKE_NAME:
            return <Stake tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_UNSTAKE_NAME:
            return <Unstake tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_ALL_BALANCES_NAME:
            return <AllBalances tool={tool} prevToolAgent={prevToolAgent} />
        case SEARCH_KNOWLEDGE_NAME:
            return <SearchKnowledge tool={tool} prevToolAgent={prevToolAgent} />
        case INVOKE_AGENT_NAME:
            return <InvokeAgent tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_GET_TOKEN_ADDRESS_NAME:
            return <GetTokenAddress tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_TOP_HOLDERS_NAME:
            return <GetTopHolders tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_BUBBLE_MAPS_NAME:
            return <BubbleMaps tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_TOKEN_HOLDERS_NAME:
            return <NumHolders tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_GET_POOLS_NAME:
            return <GetPools tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_DEPOSIT_LIQUIDITY_NAME:
            return <DepositLiquidity tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_GET_LP_TOKENS_NAME:
            return <GetLpTokens tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_WITHDRAW_LIQUIDITY_NAME:
            return <WithdrawLiquidity tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_GET_TOP_TRADERS_NAME:
            return <GetTopTraders tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_GET_TRADER_TRADES_NAME:
            return <GetTrades tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_TOKEN_TOP_TRADERS_NAME:
            return <GetTopTokenTraders tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_TOKEN_PRICE_CHART_NAME:
            return <PriceChart tool={tool} prevToolAgent={prevToolAgent} />
        case SOLANA_GET_SMART_MONEY_INFLOWS_NAME:
            return <GetSmartMoneyInflows tool={tool} prevToolAgent={prevToolAgent} />
        default:
            return (
                <pre className="whitespace-pre-wrap">
                    {JSON.stringify(tool, null, 2)}
                </pre>
            );
    }
}

export default ToolInvocation