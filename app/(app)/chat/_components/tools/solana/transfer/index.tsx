import React from 'react';

import ToolCard from '../../tool-card';

import TransferCallBody from './call';
import TransferResult from './result';

import type {
  CardanoTransferArgumentsType,
  CardanoTransferResultType,
} from '@/ai/cardano';
import type { ToolInvocation } from 'ai';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const Transfer: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText="Transferring..."
      result={{
        heading: (result: CardanoTransferResultType) =>
          result.body ? 'Transfer Complete' : 'Failed to Transfer',
        body: (result: CardanoTransferResultType) =>
          result.body ? (
            <TransferResult
              amount={tool.args.amount}
              to={tool.args.to}
              transferResult={result.body}
            />
          ) : (
            result.message
          ),
      }}
      call={{
        heading: 'Transfer',
        body: (toolCallId: string, args: CardanoTransferArgumentsType) => (
          <TransferCallBody toolCallId={toolCallId} args={args} />
        ),
      }}
      defaultOpen={true}
      prevToolAgent={prevToolAgent}
    />
  );
};

export default Transfer;
