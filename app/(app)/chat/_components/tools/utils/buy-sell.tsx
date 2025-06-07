'use client';

import React from 'react';

interface Props {
  buy: number;
  sell: number;
  prefix?: string;
  suffix?: string;
  address?: string;
}

const BuySell: React.FC<Props> = ({ buy, sell, prefix, suffix, address }) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <div className="flex justify-between text-xs">
        <span className="text-red-500">
          {address && address === 'lovelace'
            ? 'N/A'
            : `${((sell / (buy + sell)) * 100).toFixed(2)}%`}
        </span>
        <span className="text-green-500">
          {address && address === 'lovelace'
            ? 'N/A'
            : `${((buy / (buy + sell)) * 100).toFixed(2)}%`}
        </span>
      </div>
      <div className="flex w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="bg-red-500 h-full"
          style={{
            width: `${(sell / (buy + sell)) * 100}%`,
          }}
        />
        <div
          className="bg-green-500 h-full"
          style={{
            width: `${(buy / (buy + sell)) * 100}%`,
          }}
        />
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-red-500">
          {address && address === 'lovelace' ? (
            'N/A'
          ) : (
            <>
              {prefix}
              {sell.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              {suffix}
            </>
          )}
        </span>
        <span className="text-green-500">
          {address && address === 'lovelace' ? (
            'N/A'
          ) : (
            <>
              {prefix}
              {buy.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              {suffix}
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default BuySell;
