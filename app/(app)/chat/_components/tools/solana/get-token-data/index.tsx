import React from 'react';

import ToolCard from '../../tool-card';

import GetTokenDataResult from './result';

import type { ToolInvocation } from 'ai';
import type { CardanoGetTokenDataResultType } from '@/ai/cardano';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const GetTokenData: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting Token Data...`}
      result={{
        heading: (result: CardanoGetTokenDataResultType) =>
          result.body
            ? `Fetched ${result.body.token.name || 'Token'} Data`
            : `Failed to fetch token data`,
        body: (result: CardanoGetTokenDataResultType) =>
          result.body ? (
            <GetTokenDataResult body={result.body} />
          ) : (
            'No token data found'
          ),
      }}
      defaultOpen={true}
      prevToolAgent={prevToolAgent}
      className="w-full"
    />
  );
};

export default GetTokenData;
