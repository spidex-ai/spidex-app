import React from "react";

import { Card } from "@/components/ui";

// import type { TrendingToken } from '@/services/birdeye/types'
import Link from "next/link";

import SaveToken from "@/app/(app)/_components/save-token";
import { TopToken } from "@/services/taptools/types";

import { getLogoUrl } from "@/app/utils/logo";
interface Props {
  token: TopToken;
}

const TrendingTokenCard: React.FC<Props> = ({ token }) => {
  return (
    <Link href={`/token/${token.unit}`}>
      <Card className="flex flex-col gap-2 p-2 justify-between hover:border-brand-600 dark:hover:border-brand-600 transition-all duration-300 cursor-pointer h-full">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            {token.logo ? (
              <img
                src={getLogoUrl(token.logo)}
                alt={token.ticker}
                className="size-8 rounded-full"
              />
            ) : (
              <img
                src={"/icons/logo.svg"}
                alt={token.ticker}
                className="size-8 rounded-full"
              />
            )}
            <div className="flex flex-col">
              <p className="text-sm font-bold">
                {token.name} ({token.ticker})
              </p>
              <p className="text-xs text-muted-foreground">
                $
                {token?.usdPrice?.toLocaleString(undefined, {
                  maximumFractionDigits: 5,
                })}
              </p>
            </div>
          </div>
          <SaveToken address={token.unit} />
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">
            Market Cap: $
            {token?.volume
              ? token?.volume?.toLocaleString()
              : token?.mcap?.toLocaleString()}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default TrendingTokenCard;
