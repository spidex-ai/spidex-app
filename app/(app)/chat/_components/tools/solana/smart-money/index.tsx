import React from 'react';

import ToolCard from '../../tool-card';

import type { ToolInvocation } from 'ai';
import type {
  CardanoGetSmartMoneyInflowsResultType,
  CardanoGetSmartMoneyInflowsResultBodyType,
} from '@/ai/cardano';

import Link from 'next/link';
import { TopTokenVolume } from '@/services/taptools/types';

import { Card } from '@/components/ui';
import SaveToken from '@/app/(app)/_components/save-token';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const SmartMoneyInflows: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting Smart Money Inflows...`}
      result={{
        heading: (result: CardanoGetSmartMoneyInflowsResultType) =>
          result.body
            ? `Fetched Smart Money Inflows`
            : `Failed to fetch smart money inflows`,
        body: (result: CardanoGetSmartMoneyInflowsResultType) =>
          result.body ? (
            <SmartMonyeToken body={result.body} />
          ) : (
            'No balance found'
          ),
      }}
      prevToolAgent={prevToolAgent}
      className="w-full"
    />
  );
};

const SmartMonyeToken = ({
  body,
}: {
  body: CardanoGetSmartMoneyInflowsResultBodyType;
}) => {
  console.log('body:::::: ', body);
  // return <div>this is trending tokens</div>
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {body.tokens.map((token: TopTokenVolume) => (
        <TokenCard key={token.unit} token={token} />
        // <Link>hihi</Link>
      ))}
    </div>
  );
};

const TokenCard = ({ token }: { token: TopTokenVolume }) => {
  return (
    <Link href={`/token/${token.unit}`}>
      <Card className="flex flex-col gap-2 p-2 justify-center hover:border-brand-600 dark:hover:border-brand-600 transition-all duration-300">
        <div className="flex flex-row items-center gap-2 justify-between">
          <div className="flex flex-row items-center gap-2">
            {token?.logo ? (
              <img
                src={token.logo}
                alt={token.ticker}
                className="w-10 h-10 rounded-full"
              />
            ) : null}
            <div className="flex flex-col">
              <p className="text-sm font-bold">
                {token.name} {token.ticker ? `(${token.ticker})` : null}
              </p>
              <p className="text-xs text-muted-foreground">
                $
                {token.price.toLocaleString(undefined, {
                  maximumFractionDigits: 5,
                })}
              </p>
            </div>
          </div>
          <SaveToken address={token.unit} />
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">
            Volume: ${token.volume?.toLocaleString() ?? 'N/A'}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default SmartMoneyInflows;
