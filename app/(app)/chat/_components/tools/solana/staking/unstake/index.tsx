import React from 'react';

import ToolCard from '../../../tool-card';

import UnstakeCallBody from './call';
import UnstakeResult from './unstake-result';

import type { ToolInvocation } from 'ai';
import type { CardanoUnstakeResultType, CardanoUnstakeArgumentsType } from '@/ai/cardano';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const Unstake: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText="Unstaking..."
      result={{
        heading: (result: CardanoUnstakeResultType) =>
          result.body ? 'Unstake Complete' : 'Failed to Unstake',
        body: (result: CardanoUnstakeResultType) =>
          result.body ? <UnstakeResult /> : result.message,
      }}
      call={{
        heading: 'Unstake',
        body: (toolCallId: string, args: CardanoUnstakeArgumentsType) => (
          <UnstakeCallBody toolCallId={toolCallId} args={args} />
        ),
      }}
      defaultOpen={true}
      prevToolAgent={prevToolAgent}
      className="max-w-full"
    />
  );
};

export default Unstake;
