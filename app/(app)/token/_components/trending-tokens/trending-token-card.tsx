import React from "react";

import { Card, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";

// import type { TrendingToken } from '@/services/birdeye/types'
import Link from "next/link";

import SaveToken from "@/app/(app)/_components/save-token";
import { TopToken } from "@/services/taptools/types";

import { getLogoUrl } from "@/app/utils/logo";
interface Props {
  token: TopToken;
  title?: string;
}

const TrendingTokenCard: React.FC<Props> = ({ token, title = "Market Cap" }) => {
  const usdPrice = Number(token?.usdPrice) < 0.00001 ? "~0.00001" : token?.usdPrice?.toLocaleString(undefined, {
    maximumFractionDigits: 5,
  });
  const mcap = Number(token?.mcap) < 0.0001 ? "~0.0001" : token?.mcap?.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
  const volume = Number(token?.volume) < 0.0001 ? "~0.0001" : token?.volume?.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
  const price24hChg = token?.price24hChg?.toLocaleString(undefined, {
    maximumFractionDigits: 4,
  });
  return (
    <Link href={`/token/${token.unit}`}>
      <Card className="flex flex-col gap-2 p-2 justify-between hover:border-brand-600 dark:hover:border-brand-600 transition-all duration-300 cursor-pointer h-full">        <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-row items-center gap-2 flex-1 min-w-0">
          {token.logo ? (
            <img
              src={getLogoUrl(token.logo)}
              alt={token.ticker}
              className="size-8 rounded-full flex-shrink-0"
            />
          ) : (
            <img
              src={"/icons/logo.svg"}
              alt={token.ticker}
              className="size-8 rounded-full flex-shrink-0"
            />
          )}
          <div className="flex flex-col min-w-0 flex-1">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <p className="text-sm font-bold truncate cursor-help">
                  {token.name} ({token.ticker})
                </p>
              </TooltipTrigger>
              <TooltipContent>
                {token.name} ({token.ticker})
              </TooltipContent>
            </Tooltip>
            <p className="text-xs text-muted-foreground">
              <span>$
              {usdPrice}</span> {" "}
              <span className={`${Number(price24hChg) > 0 ? "text-green-500" : "text-red-500"}`}>
                {`(${price24hChg && Number(price24hChg) > 0 ? `+${price24hChg}` : price24hChg}%)`}
              </span>
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 self-start">
          <SaveToken address={token.unit} />
        </div>
      </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">
            {title}: $
            {token?.volume
              ? volume
              : mcap}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default TrendingTokenCard;
