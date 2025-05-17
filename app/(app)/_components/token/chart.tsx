"use client";

import React, { useEffect, useState } from "react";

import { Button, CandlestickChart, Skeleton } from "@/components/ui";

import { usePriceChartCore } from "@/hooks";

import { cn } from "@/lib/utils";

import type { UTCTimestamp } from "lightweight-charts";
import { CandleStickInterval } from "@/services/hellomoon/types";
import { CardanoTokenDetail } from "@/services/dexhunter/types";
import { QuoteType } from "../../token/[address]/_components/header/select-quote";

const WINDOWS = [
  {
    label: CandleStickInterval.THREE_MINUTES,
    timeframe: CandleStickInterval.THREE_MINUTES,
    numDays: 1000,
  },
  {
    label: CandleStickInterval.FIVE_MINUTES,
    timeframe: CandleStickInterval.FIVE_MINUTES,
    numDays: 1000,
  },
  {
    label: CandleStickInterval.FIFTEEN_MINUTES,
    timeframe: CandleStickInterval.FIFTEEN_MINUTES,
    numDays: 1000,
  }, 
  {
    label: CandleStickInterval.THIRTY_MINUTES,
    timeframe: CandleStickInterval.THIRTY_MINUTES,
    numDays: 1000,
  },
  {
    label: CandleStickInterval.ONE_HOUR,
    timeframe: CandleStickInterval.ONE_HOUR,
    numDays: 180,
  },
  {
    label: CandleStickInterval.TWO_HOURS,
    timeframe: CandleStickInterval.TWO_HOURS,
    numDays: 180,
  }, 
  {
    label: CandleStickInterval.FOUR_HOURS,
    timeframe: CandleStickInterval.FOUR_HOURS,
    numDays: 180,
  },
  {
    label: CandleStickInterval.TWELVE_HOURS,
    timeframe: CandleStickInterval.TWELVE_HOURS,
    numDays: 180,
  }, 
  {
    label: CandleStickInterval.ONE_DAY,
    timeframe: CandleStickInterval.ONE_DAY,
    numDays: 180,
  },
  {
    label: CandleStickInterval.THREE_DAYS,
    timeframe: CandleStickInterval.THREE_DAYS,
    numDays: 60,
  },
  {
    label: CandleStickInterval.ONE_WEEK,
    timeframe: CandleStickInterval.ONE_WEEK,
    numDays: 12,
  },
  {
    label: CandleStickInterval.ONE_MONTH,
    timeframe: CandleStickInterval.ONE_MONTH,
    numDays: 12,
  },
];

interface Props {
  data: CardanoTokenDetail | null;
  isLoadingTokenDetail: boolean;
  quote: QuoteType;
}

const TokenChart: React.FC<Props> = ({ data: tokenDetail, isLoadingTokenDetail, quote }) => {
  const [timeframe, setTimeframe] = useState<CandleStickInterval>(
    CandleStickInterval.FOUR_HOURS
  );
  const [numDays, setNumDays] = useState<number>(180);
  const { data, isLoading, refetchDataChart } = usePriceChartCore(
    tokenDetail?.unit ?? "",
    timeframe,
    numDays,
    quote
  );

  useEffect(() => {
      const interval = setInterval(() => {
          refetchDataChart();
      }, 1000 * 60);

      return () => clearInterval(interval);
  }, [tokenDetail]);

  const price = data?.length > 0 ? data[data.length - 1].close : 0;
  const open = data?.length > 0 ? data[0].open : 0;
  const change = ((price - open) / open) * 100;

  const currentPrice = price < 0.0001 ? '~0.0001' : price.toLocaleString(undefined, {
    maximumFractionDigits: 4,
  });

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 bg-neutral-100 dark:bg-bg-secondary p-2">
        {isLoadingTokenDetail || isLoading ? (
          <Skeleton className="h-4 w-24" />
        ) : (
          <>
            {data?.length > 0 ? (
              <p className="text-md md:text-lg font-bold">
                {
                  quote === QuoteType.USD ? (
                    <>{`$${currentPrice}`}
                      </>
                  ) : (
                    <>{`${currentPrice} ${quote}`}</>
                  )
                }
                <span
                  className={cn(change > 0 ? "text-green-500" : "text-red-500")}
                >
                  {" "}({change > 0 ? "+" : ""}
                  {change.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  %)
                </span>
              </p>
            ) : null}
          </>
        )}
        <div className="flex flex-row gap-1 ">
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
              className={cn(
                "text-sm h-fit w-fit px-1 py-0.5",
                numDays === window.numDays && timeframe === window.timeframe
                  ? "text-black dark:text-black"
                  : "text-white dark:text-white"
              )}
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
