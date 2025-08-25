import { NextRequest } from 'next/server';

import { streamText } from 'ai';

import { Coinbase } from '@coinbase/coinbase-sdk';

import { CdpAgentkit, cdpTools } from '@/ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const POST = async (req: NextRequest) => {
  const { messages } = await req.json();

  const agentkit = await CdpAgentkit.configureWithWallet({
    networkId: Coinbase.networks.BaseSepolia,
    cdpWalletData: process.env.WALLET_DETAILS,
  });

  const result = streamText({
    model: openrouter.languageModel('openai/gpt-4o-mini') as any,
    tools: cdpTools(agentkit),
    messages,
  });

  result.toDataStream();

  return result.toDataStreamResponse();
};
