import { marketAgent } from './market';
import { walletAgent } from './wallet';
import { knowledgeAgent } from './knowledge';
import { tradingAgent } from './trading';
import { tokenAnalysisAgent } from './token-analysis';

export const agents = [
  walletAgent,
  marketAgent,
  tradingAgent,
  knowledgeAgent,
  tokenAnalysisAgent,
];
