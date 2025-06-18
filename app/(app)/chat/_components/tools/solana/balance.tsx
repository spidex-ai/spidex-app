import React from 'react';

import ToolCard from '../tool-card';
// import { TokenBalance } from "../utils";

import type { CardanoBalanceResultType } from '@/ai';
import type { ToolInvocation } from 'ai';
import { ListTransaction } from '../utils/transaction';
// import Transaction from '../utils/transaction';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const GetBalance: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting ${tool.args.tokenAddress || 'ADA'} Balance...`}
      result={{
        heading: (result: CardanoBalanceResultType) =>
          result.body?.walletTx
            ? `Found ${result.body.walletTx.length} transactions`
            : `No transactions found`,
        body: (result: CardanoBalanceResultType) =>
          result.body ? (
            <ListTransaction data={result.body.walletTx || []} />
          ) : (
            'No balance found'
          ),
      }}
      prevToolAgent={prevToolAgent}
      fullWidth
    />
  );
};

export default GetBalance;
