import React from 'react';

import ToolCard from '../../../tool-card';

import GetPoolsResult from './result';

import type { ToolInvocation } from 'ai';
import type { CardanoGetPoolsResultType } from '@/ai/cardano';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const GetPools: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting Liquidity Pools...`}
      result={{
        heading: (result: CardanoGetPoolsResultType) =>
          result.body?.pools
            ? `Fetched ${result.body.pools.length} Pools`
            : `Failed to fetch pools`,
        body: (result: CardanoGetPoolsResultType) =>
          result.body ? (
            <GetPoolsResult body={result.body} />
          ) : (
            'No pools found'
          ),
      }}
      prevToolAgent={prevToolAgent}
      className="w-full"
    />
  );
};

export default GetPools;
