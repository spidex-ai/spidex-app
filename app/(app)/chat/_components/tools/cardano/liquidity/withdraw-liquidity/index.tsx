import React from 'react';

import ToolCard from '../../../tool-card';

import WithdrawLiquidityCall from './call';
import WithdrawLiquidityResult from './result';

import type { ToolInvocation } from 'ai';
import type {
  CardanoWithdrawLiquidityResultType,
  CardanoWithdrawLiquidityArgumentsType,
} from '@/ai/cardano';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const WithdrawLiquidity: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting Liquidity Pools...`}
      result={{
        heading: (result: CardanoWithdrawLiquidityResultType) =>
          result.body ? `Withdrawn Liquidity` : `Failed to withdraw liquidity`,
        body: (result: CardanoWithdrawLiquidityResultType) =>
          result.body ? (
            <WithdrawLiquidityResult body={result.body} />
          ) : (
            result.message
          ),
      }}
      prevToolAgent={prevToolAgent}
      call={{
        heading: 'Withdraw Liquidity',
        body: (
          toolCallId: string,
          args: CardanoWithdrawLiquidityArgumentsType
        ) => <WithdrawLiquidityCall toolCallId={toolCallId} args={args} />,
      }}
      className="w-96 max-w-full"
    />
  );
};

export default WithdrawLiquidity;
