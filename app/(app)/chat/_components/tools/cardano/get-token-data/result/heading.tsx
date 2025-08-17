'use client';

import React from 'react';

import Link from 'next/link';

import { Button, Card } from '@/components/ui';

import Address from '@/app/_components/address';

import SaveToken from '@/app/(app)/_components/save-token';

import Links from './links';

import { cn } from '@/lib/utils';

// import type { TokenOverview } from '@/services/birdeye/types'
import { TokenStats } from '@/services/taptools/types';

interface Props {
  token: TokenStats;
}

const GetTokenDataResultHeading: React.FC<Props> = ({ token }) => {
  return (
    <Card className="p-2 flex flex-col md:flex-row justify-between gap-4">
      <div className="flex items-center gap-2">
        <img
          src={token.tokenLogo ?? ''}
          alt={token.mcap.ticker}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center md:gap-2">
            <h1 className="text-xl font-bold">
              {token.mcap.ticker} ({token.mcap.ticker})
            </h1>
            <Address address={token.tokenAddress!} />
            <Link href={`/token/${token.tokenAddress}`}>
              <Button variant="brandOutline" className="p-1 h-6 text-xs w-fit">
                See More
              </Button>
            </Link>
            <SaveToken address={token.tokenAddress!} />
          </div>
          <p className="text-sm font-semibold flex items-center gap-1">
            $
            {token.usdPrice.toLocaleString(undefined, {
              maximumFractionDigits: 5,
            })}
            {token.tokenPriceChange?.['24h'] && (
              <span
                className={cn(
                  'text-xs',
                  token.tokenPriceChange['24h'] > 0
                    ? 'text-green-500'
                    : 'text-red-500'
                )}
              >
                {token.tokenPriceChange['24h']
                  ? `(${token.tokenPriceChange['24h'] > 0 ? '+' : ''}${token.tokenPriceChange['24h'].toFixed(2)}%)`
                  : ''}
              </span>
            )}
          </p>
        </div>
      </div>
      <Links token={token} />
    </Card>
  );
};

export default GetTokenDataResultHeading;
