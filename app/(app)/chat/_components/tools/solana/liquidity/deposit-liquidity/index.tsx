import React from 'react';

import ToolCard from '../../../tool-card';

import DepositLiquidityCall from './call';
import DepositLiquidityResult from './result';

import type { ToolInvocation } from 'ai';
import type {
  CardanoDepositLiquidityArgumentsType,
  CardanoDepositLiquidityResultType,
} from '@/ai/cardano';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const DepositLiquidity: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting Liquidity Pools...`}
      result={{
        heading: (result: CardanoDepositLiquidityResultType) =>
          result.body ? `Deposited Liquidity` : `Failed to deposit liquidity`,
        body: (result: CardanoDepositLiquidityResultType) =>
          result.body ? (
            <DepositLiquidityResult body={result.body} />
          ) : (
            result.message
          ),
      }}
      prevToolAgent={prevToolAgent}
      call={{
        heading: 'Deposit Liquidity',
        body: (
          toolCallId: string,
          args: CardanoDepositLiquidityArgumentsType
        ) => <DepositLiquidityCall toolCallId={toolCallId} args={args} />,
      }}
      className="w-96 max-w-full"
    />
  );
};

export default DepositLiquidity;
