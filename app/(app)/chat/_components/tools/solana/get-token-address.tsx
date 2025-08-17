import React from 'react';

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { CardanoGetTokenAddressResultType } from '@/ai/cardano';
import Address from '@/app/_components/address';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const GetTokenAddress: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting ${tool.args.keyword} Address...`}
      result={{
        heading: (result: CardanoGetTokenAddressResultType) =>
          result.body
            ? `Fetched ${tool.args.keyword} Address`
            : `Failed to fetch token address`,
        body: (result: CardanoGetTokenAddressResultType) =>
          result.body ? (
            <Address address={result.body.address} />
          ) : (
            'No token address found'
          ),
      }}
      prevToolAgent={prevToolAgent}
      defaultOpen={false}
    />
  );
};

export default GetTokenAddress;
