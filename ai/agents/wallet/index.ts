import { PORTFOLIO_AGENT_CAPABILITIES } from './capabilities';
import { PORTFOLIO_AGENT_DESCRIPTION } from './description';
import { PORTFOLIO_AGENT_NAME } from './name';
import { WALLET_TOOLS } from './tools';

import type { Agent } from '@/ai/agent';

export const portfolioAgent: Agent = {
  name: PORTFOLIO_AGENT_NAME,
  slug: 'wallet',
  systemPrompt: PORTFOLIO_AGENT_DESCRIPTION,
  capabilities: PORTFOLIO_AGENT_CAPABILITIES,
  tools: WALLET_TOOLS,
};
