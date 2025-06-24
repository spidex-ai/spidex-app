import { marketAgent } from './market';
import { portfolioAgent } from './wallet';
import { knowledgeAgent } from './knowledge';
import { tradingAgent } from './trading';
import { tokenAnalysisAgent } from './token-analysis';

export const agents = [
  portfolioAgent,
  marketAgent,
  tradingAgent,
  knowledgeAgent,
  tokenAnalysisAgent,
];
