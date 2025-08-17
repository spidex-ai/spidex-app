'use client';

import React from 'react';

import ToolCard from '../base'; 

import type { ToolInvocation } from 'ai';
import type { CardanoDepositLiquidityResultType } from '@/ai/cardano';

interface Props {
  tool: ToolInvocation;
}

const LiquidityAnalysis: React.FC<Props> = ({ tool }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText="Analyzing Liquidity..."
      result={{
        heading: (result: CardanoDepositLiquidityResultType) =>
          result.body ? `Liquidity Analysis` : `Failed to Analyze Liquidity`,
        body: (result: CardanoDepositLiquidityResultType) =>
          result.body ? (
            <div className="flex flex-col gap-2">
             
            </div>
          ) : (
            'Failed to analyze liquidity'
          ),
      }}
      className="w-full"
    />
  );
};

export default LiquidityAnalysis;
