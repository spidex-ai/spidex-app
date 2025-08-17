'use client';

import React from 'react';

import {
  NumMentions,
  PriceAnalysis,
  TopHolders,
} from './tools';

import {
  CARDANO_TOKEN_PAGE_PRICE_ANALYSIS_NAME,
  CARDANO_TOKEN_PAGE_TOP_HOLDERS_NAME,
  TOKEN_PAGE_NUM_MENTIONS_NAME,
} from '@/ai/action-names';

import type { ToolInvocation } from 'ai';
import type { TokenChatData } from '@/types';

interface Props {
  tool: ToolInvocation;
  token: TokenChatData;
}

const Tool: React.FC<Props> = ({ tool, token }) => {
  switch (tool.toolName) {
    case CARDANO_TOKEN_PAGE_TOP_HOLDERS_NAME:
      return <TopHolders tool={tool} />;
    case TOKEN_PAGE_NUM_MENTIONS_NAME:
      return <NumMentions tool={tool} />;
    case CARDANO_TOKEN_PAGE_PRICE_ANALYSIS_NAME:
      return <PriceAnalysis tool={tool} token={token} />;
    default:
      return <pre>{JSON.stringify(tool, null, 2)}</pre>;
  }
};

export default Tool;
