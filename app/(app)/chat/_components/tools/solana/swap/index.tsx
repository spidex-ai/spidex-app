import React from 'react';

import ToolCard from '../../tool-card';

import SwapCard from './swap-result';
import SwapCallBody from './call';

import type { ToolInvocation } from 'ai';
import type { CardanoTradeResultType, CardanoTradeArgumentsType } from '@/ai';

interface SwapProps {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const Swap: React.FC<SwapProps> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText="Completing Trade..."
      result={{
        heading: (result: CardanoTradeResultType) =>
          result.body ? 'Trade Complete' : 'Failed to complete trade',
        body: (result: CardanoTradeResultType) =>
          result.body ? <SwapCard /> : result.message,
      }}
      call={{
        heading: 'Swap',
        body: (toolCallId: string, args: CardanoTradeArgumentsType) => (
          <SwapCallBody toolCallId={toolCallId} args={args} />
        ),
      }}
      defaultOpen={true}
      prevToolAgent={prevToolAgent}
      className="max-w-full"
    />
  );
};

export default Swap;
