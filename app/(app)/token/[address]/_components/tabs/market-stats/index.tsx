"use client";

import React from "react";

import { Skeleton } from "@/components/ui";

// import TimeStats from "./time-stats";

import { useTokenStats } from "@/hooks";

interface Props {
  tokenId: string | undefined;
  tokenName: string | undefined;
  isLoadingTokenDetail: boolean;
}

const MarketStats: React.FC<Props> = ({ tokenId, isLoadingTokenDetail }) => {
  const { data: tokenStats, isLoading } = useTokenStats(tokenId);

  if (isLoading || isLoadingTokenDetail) {
    return <Skeleton className="h-[100px] w-full" />;
  }

  return (
    <div className="grid grid-cols-7 gap-2">
      <div className="col-span-1">
        <div className="flex flex-col gap-2">
          <div className="bg-bg-tab p-2 flex flex-1 justify-center">
            <div className="min-h-[80px] flex flex-col justify-center items-center gap-3">
              <div className="text-xs font-semibold text-text-gray">Price USD</div>
              <div className="text-xs text-white">{tokenStats?.usdPrice ? tokenStats?.usdPrice.toLocaleString(undefined, {
                maximumFractionDigits: 4,
              }) : "N/A"}</div>
            </div>
          </div>

          <div className="bg-bg-tab p-2 flex flex-1 justify-center">
            <div className="min-h-[80px] flex flex-col justify-center items-center gap-3">
              <div className="text-xs font-semibold text-text-gray">Liquidity</div>
              <div className="text-xs text-white">
                {tokenStats?.liquidity
                  ? tokenStats?.liquidity.toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                  })
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-6 bg-bg-tab rounded-md p-2">
        <div className="grid grid-cols-5 gap-2">
          {/* <StatItem
            label="Liquidity"
            value={
              tokenStats?.mcap.circSupply
                ? tokenStats?.mcap.circSupply.toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                })
                : "N/A"
            }
          /> */}
          <StatItem
            label="Market Cap"
            value={
              tokenStats?.mcap.mcap ? `$${tokenStats?.mcap.mcap.toLocaleString()}` : "--"
            }
          />

          <StatItem
            label="FDV"
            value={
              tokenStats?.mcap?.fdv ? `$${tokenStats?.mcap.fdv.toLocaleString()}` : "--"
            }
          />
          {/* <StatItem
            label="Pooled USD"
            value={
               "--"
            }
          /> */}
          <StatItem
            label="Holders"
            value={
              tokenStats?.holders
                ? tokenStats?.holders.toLocaleString()
                : "--"
            }
          />
          {/* <StatItem
            label="Token Listed"
            value={
               "--"
            }
          /> */}
          <StatItem
            label="Circ Supply"
            value={
              tokenStats?.mcap.circSupply
                ? tokenStats?.mcap.circSupply.toLocaleString()
                : "--"
            }
          />
          <StatItem
            label="Total Supply"
            value={
              tokenStats?.mcap.totalSupply
                ? tokenStats?.mcap.totalSupply.toLocaleString()
                : "--"
            }
          />
          {/* <StatItem
            label={`% Pooled ${tokenName}`}
            value={
               "--"
            }
          /> */}
        </div>
      </div>
    </div>
  );
};

interface StatItemProps {
  label: string;
  value: string;
  formatOptions?: Intl.NumberFormatOptions;
  prefix?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
}) => {
  return (
    <div className="col-span-1">
      <div className="min-h-[88px] flex flex-col gap-3 justify-center items-center rounded-md p-2 bg-bg-secondary">
        <div className="text-xs font-semibold text-text-gray">{label}</div>
        <div className="text-xs text-white">{value}</div>
      </div>
    </div>
  );
};

export default MarketStats;
