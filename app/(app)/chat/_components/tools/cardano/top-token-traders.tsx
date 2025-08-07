import React, { useState } from 'react';

import Image from 'next/image';

import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

import WalletAddress from '@/app/_components/wallet-address';

import ToolCard from '../tool-card';

import { knownAddresses } from '@/lib/known-addresses';

import type { ToolInvocation } from 'ai';
import type {
  CardanoTopTokenTradersResultType,
  CardanoTopTokenTradersResultBodyType,
} from '@/ai/cardano';
import { formatNumber } from '@/lib/utils';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const GetTopTokenTraders: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting Top Traders...`}
      result={{
        heading: (result: CardanoTopTokenTradersResultType) =>
          result.body
            ? `Fetched Top Traders (${tool.args.timeFrame[0].toUpperCase() + tool.args.timeFrame.slice(1)})`
            : `Failed to fetch top traders`,
        body: (result: CardanoTopTokenTradersResultType) =>
          result.body ? (
            <TopTokenTraders body={result.body} />
          ) : (
            'No top traders found'
          ),
      }}
      defaultOpen={true}
      prevToolAgent={prevToolAgent}
      className="w-full"
    />
  );
};

const TopTokenTraders = ({ body }: { body: CardanoTopTokenTradersResultBodyType }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <Card className="flex flex-col gap-2 w-full p-2">
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 text-center">Rank</TableHead>
            <TableHead className="text-center">Trader</TableHead>
            <TableHead className="text-center">Trades</TableHead>
            <TableHead className="text-center">Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.topTraders
            .slice(0, showAll ? body.topTraders.length : 5)
            .map((trader, index) => (
              <TableRow key={trader.owner}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="">
                  {knownAddresses[trader.owner] ? (
                    <div className="flex flex-row items-center gap-2">
                      <Image
                        src={knownAddresses[trader.owner].logo}
                        alt={knownAddresses[trader.owner].name}
                        width={16}
                        height={16}
                      />
                      <span className="font-medium">
                        {knownAddresses[trader.owner].name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <WalletAddress
                        address={trader.owner}
                        className="font-medium"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell className="">
                  <div className="flex flex-col w-full gap-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-red-500">
                        {(
                          (trader.tradeSell /
                            (trader.tradeBuy + trader.tradeSell)) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                      <span className="text-green-500">
                        {(
                          (trader.tradeBuy /
                            (trader.tradeBuy + trader.tradeSell)) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                    <div className="flex w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="bg-red-500 h-full"
                        style={{
                          width: `${(trader.tradeSell / (trader.tradeBuy + trader.tradeSell)) * 100}%`,
                        }}
                      />
                      <div
                        className="bg-green-500 h-full"
                        style={{
                          width: `${(trader.tradeBuy / (trader.tradeBuy + trader.tradeSell)) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-red-500">
                        {formatNumber(trader.tradeSell)}
                      </span>
                      <span className="text-green-500">
                        {formatNumber(trader.tradeBuy)}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col w-full gap-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-green-500">
                        {(
                          (trader.volumeBuy /
                            (trader.volumeBuy + trader.volumeSell)) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                      <span className="text-red-500">
                        {(
                          (trader.volumeSell /
                            (trader.volumeBuy + trader.volumeSell)) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                    <div className="flex w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500 h-full"
                        style={{
                          width: `${(trader.volumeBuy / (trader.volumeBuy + trader.volumeSell)) * 100}%`,
                        }}
                      />
                      <div
                        className="bg-red-500 h-full"
                        style={{
                          width: `${(trader.volumeSell / (trader.volumeBuy + trader.volumeSell)) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-green-500">
                        {formatNumber(trader.volumeBuy)}
                      </span>
                      <span className="text-red-500">
                        {formatNumber(trader.volumeSell)}
                      </span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Button variant="ghost" onClick={() => setShowAll(!showAll)}>
        {showAll ? 'Show Less' : 'Show All'}
      </Button>
    </Card>
  );
};

export default GetTopTokenTraders;
