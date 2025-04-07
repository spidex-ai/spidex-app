"use client";

import React, { useEffect, useState } from "react";

import { Button, CandlestickChart, Skeleton } from "@/components/ui";

import { usePriceChart, usePriceChartTaptools } from "@/hooks";

import { cn } from "@/lib/utils";

import type { UTCTimestamp } from "lightweight-charts";
import {
  CandlestickGranularity,
  CandleStickInterval,
  TokenPriceCandlestick,
} from "@/services/hellomoon/types";
import { useTaptools } from "@/hooks/useTaptools";

const WINDOWS = [
  {
    label: "4h",
    timeframe: CandlestickGranularity.ONE_MIN,
    numDays: 1 / 4,
  },
  {
    label: "12h",
    timeframe: CandlestickGranularity.ONE_MIN,
    numDays: 1 / 12,
  },
  {
    label: "1d",
    timeframe: CandlestickGranularity.FIVE_MIN,
    numDays: 1,
  },
  {
    label: "3d",
    timeframe: CandlestickGranularity.FIVE_MIN,
    numDays: 3,
  },
  {
    label: "7d",
    timeframe: CandlestickGranularity.ONE_HOUR,
    numDays: 7,
  },
  {
    label: "30d",
    timeframe: CandlestickGranularity.ONE_HOUR,
    numDays: 30,
  },
];

interface Props {
  mint: string;
}

const TokenChart: React.FC<Props> = ({ mint }) => {
  const [timeframe, setTimeframe] = useState<CandlestickGranularity>(
    CandlestickGranularity.FIVE_MIN
  );
  const [numDays, setNumDays] = useState<number>(1);
  const { data, isLoading, error } = usePriceChartTaptools(
    "8fef2d34078659493ce161a6c7fba4b56afefa8535296a5743f6958741414441",
    CandleStickInterval.FOUR_HOURS,
    180
  );
  console.log("data:::", data);

  const price = data?.length > 0 ? data[data.length - 1].close : 0;
  const open = data?.length > 0 ? data[0].open : 0;
  const change = ((price - open) / open) * 100;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 bg-neutral-100 dark:bg-neutral-700 p-2">
        {isLoading ? (
          <Skeleton className="h-4 w-24" />
        ) : (
          <>
            {data?.length > 0 ? (
              <p className="text-md md:text-lg font-bold">
                $
                {data[data.length - 1].close.toLocaleString(undefined, {
                  maximumFractionDigits: 5,
                })}{" "}
                <span
                  className={cn(change > 0 ? "text-green-500" : "text-red-500")}
                >
                  ({change > 0 ? "+" : ""}
                  {change.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  %)
                </span>
              </p>
            ) : null}
          </>
        )}
        <div className="flex flex-row gap-1">
          {WINDOWS.map((window) => (
            <Button
              key={window.label}
              onClick={() => {
                setNumDays(window.numDays);
                setTimeframe(window.timeframe);
              }}
              variant={
                numDays === window.numDays && timeframe === window.timeframe
                  ? "brand"
                  : "ghost"
              }
              className="text-sm h-fit w-fit px-1 py-0.5"
            >
              {window.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="p-2 flex-1 h-0">
        {isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <>
            {data.length > 0 ? (
              <CandlestickChart
                data={data.map((price) => ({
                  time: price.time as UTCTimestamp,
                  open: price.open,
                  high: price.high,
                  low: price.low,
                  close: price.close,
                }))}
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default TokenChart;
