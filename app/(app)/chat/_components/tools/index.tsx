'use client';

import React from 'react';

import {
  Balance,
  GetWalletAddress,
  GetTrendingTokens,
  GetTokenData,
  Trade,
  AllBalances,
  GetTokenAddress,
  GetTopHolders,
  NumHolders,
  GetTopTraders,
  GetTrades,
  GetTopTokenTraders,
  PriceChart,
  GetSmartMoneyInflows,
} from './cardano';
import { SearchRecentTweets } from './twitter';
import { SearchKnowledge } from './knowledge';
import { InvokeAgent } from './invoke';

import {
  TWITTER_SEARCH_RECENT_NAME,
  SEARCH_KNOWLEDGE_NAME,
  INVOKE_AGENT_NAME,
  CARDANO_ALL_BALANCES_NAME,
  CARDANO_GET_TOKEN_ADDRESS_NAME,
  CARDANO_TOP_HOLDERS_NAME,
  CARDANO_TOKEN_HOLDERS_NAME,
  CARDANO_GET_TOP_TRADERS_NAME,
  CARDANO_TOKEN_TOP_TRADERS_NAME,
  CARDANO_TOKEN_PRICE_CHART_NAME,
  CARDANO_GET_TRADER_TRADES_NAME,
  CARDANO_GET_SMART_MONEY_INFLOWS_NAME,
  CARDANO_GET_WALLET_ADDRESS_NAME,
  CARDANO_GET_TRENDING_TOKENS_NAME,
  CARDANO_GET_TOKEN_DATA_NAME,
  CARDANO_TRADE_NAME,
  CARDANO_TRANSACTION_NAME,
  SEARCH_WEB_KNOWLEDGE_NAME,
  FAQ_KNOWLEDGE_NAME,
} from '@/ai/action-names';

import SearchWebKnowledge from './knowledge/web-search-knowledge';
import type { ToolInvocation as ToolInvocationType } from 'ai';
import SearchFAQKnowledge from './knowledge/faq-search-knowledge';

interface Props {
  tool: ToolInvocationType;
  prevToolAgent?: string;
}

const ToolInvocation: React.FC<Props> = ({ tool, prevToolAgent }) => {
  const toolParts = tool.toolName.split('-');
  const toolName = toolParts.slice(1).join('-');
  console.log('🚀 ~ ToolInvocation ~ toolName:', toolName);
  switch (toolName) {
    case CARDANO_TRANSACTION_NAME:
      return <Balance tool={tool} prevToolAgent={prevToolAgent} />;
    case CARDANO_GET_WALLET_ADDRESS_NAME:
      return <GetWalletAddress tool={tool} prevToolAgent={prevToolAgent} />;
    case CARDANO_GET_TRENDING_TOKENS_NAME:
      return <GetTrendingTokens tool={tool} prevToolAgent={prevToolAgent} />;
    case CARDANO_GET_TOKEN_DATA_NAME:
      return <GetTokenData tool={tool} prevToolAgent={prevToolAgent} />;
    case CARDANO_TRADE_NAME:
      return <Trade tool={tool} prevToolAgent={prevToolAgent} />;
    case TWITTER_SEARCH_RECENT_NAME:
      return <SearchRecentTweets tool={tool} />;
    case CARDANO_ALL_BALANCES_NAME:
      return <AllBalances tool={tool} prevToolAgent={prevToolAgent} />;
    case SEARCH_KNOWLEDGE_NAME:
      return <SearchKnowledge tool={tool} prevToolAgent={prevToolAgent} />;
    case SEARCH_WEB_KNOWLEDGE_NAME:
      return <SearchWebKnowledge tool={tool} prevToolAgent={prevToolAgent} />;
    case FAQ_KNOWLEDGE_NAME:
      return <SearchFAQKnowledge tool={tool} prevToolAgent={prevToolAgent} />;
    case INVOKE_AGENT_NAME:
      return <InvokeAgent tool={tool} prevToolAgent={prevToolAgent} />;
    case CARDANO_GET_TOKEN_ADDRESS_NAME:
      return <GetTokenAddress tool={tool} prevToolAgent={prevToolAgent} />;
    case CARDANO_TOP_HOLDERS_NAME:
      return <GetTopHolders tool={tool} prevToolAgent={prevToolAgent} />;
    case CARDANO_TOKEN_HOLDERS_NAME:
      return <NumHolders tool={tool} prevToolAgent={prevToolAgent} />;
    case CARDANO_GET_TOP_TRADERS_NAME:
      return <GetTopTraders tool={tool} prevToolAgent={prevToolAgent} />;
    case CARDANO_GET_TRADER_TRADES_NAME:
      return <GetTrades tool={tool} prevToolAgent={prevToolAgent} />;
    case CARDANO_TOKEN_TOP_TRADERS_NAME:
      return <GetTopTokenTraders tool={tool} prevToolAgent={prevToolAgent} />;
    case CARDANO_TOKEN_PRICE_CHART_NAME:
      return <PriceChart tool={tool} prevToolAgent={prevToolAgent} />;
    case CARDANO_GET_SMART_MONEY_INFLOWS_NAME:
      return <GetSmartMoneyInflows tool={tool} prevToolAgent={prevToolAgent} />;
    default:
      return (
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(tool, null, 2)}
        </pre>
      );
  }
};

export default ToolInvocation;
