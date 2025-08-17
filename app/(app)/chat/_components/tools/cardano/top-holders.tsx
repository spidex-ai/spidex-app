import React, { useState } from 'react';

import { Button, Card } from '@/components/ui';

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { CardanoTopHoldersResultBodyType, CardanoTopHoldersResultType } from '@/ai/cardano';

import Address from '@/app/_components/address';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const GetTopHolders: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting Top Holders...`}
      result={{
        heading: (result: CardanoTopHoldersResultType) =>
          result.body
            ? `Fetched Top 20 Holders`
            : `Failed to fetch top holders`,
        body: (result: CardanoTopHoldersResultType) =>
          result.body ? (
            <TopHolders body={result.body} mint={tool.args.tokenAddress} />
          ) : (
            'No top holders found'
          ),
      }}
      defaultOpen={true}
      prevToolAgent={prevToolAgent}
    />
  );
};

const TopHolders = ({ body }: { body: CardanoTopHoldersResultBodyType; mint: string }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-md">
        {(body.percentageOwned * 100).toFixed(2)}% of the total supply is owned
        by the top 20 holders
      </p>
      <div className="mt-2">
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-1 flex items-center justify-center">
            Rank
          </div>
          <div className="col-span-1 flex items-center justify-center">
            Address
          </div>
          <div className="col-span-1 flex items-center justify-center">
            Amount
          </div>
          <div className="col-span-1 flex items-center justify-center">
            Percentage
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {body.topHolders
            .slice(0, showAll ? body.topHolders.length : 5)
            .map((topHolder, index) => (
              <TopHolder
                key={topHolder.address}
                topHolder={topHolder}
                index={index}
              />
            ))}
        </div>
      </div>
      <Button variant="outline" onClick={() => setShowAll(!showAll)}>
        {showAll ? 'Show Less' : 'Show All'}
      </Button>
    </div>
  );
};

const TopHolder = ({
  topHolder,
  index,
}: {
  topHolder: any & { percentageOwned: number; owner: string };
  index: number;
}) => {
  return (
    <Card className="grid grid-cols-4 items-center gap-2 p-2">
      <div className="col-span-1 flex items-center justify-center text-sm text-muted-foreground">
        {index + 1}
      </div>
      <div className="col-span-1 flex items-center justify-center text-sm text-muted-foreground">
        <Address address={topHolder.address} />
      </div>
      <div className="col-span-1 flex items-center justify-center text-sm text-muted-foreground">
        {topHolder.amount ? topHolder.amount.toLocaleString() : '0'}
      </div>
      <div className="col-span-1 flex items-center justify-center text-sm text-muted-foreground">
        {topHolder.percentageOwned
          ? `${topHolder.percentageOwned.toFixed(2)}%`
          : '0'}
      </div>
    </Card>
  );
};

export default GetTopHolders;
