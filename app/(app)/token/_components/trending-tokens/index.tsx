"use client";
import React from "react";

import TrendingTokenCard from "./trending-token-card";

import { useTokenTopMcap } from "@/hooks/queries/token/use-token-trending";
import { Skeleton } from "@/components/ui";

const TrendingTokens: React.FC = () => {
  const { data, isLoading } = useTokenTopMcap(1, 15);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold">Trending Tokens</h2>
      {isLoading ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          { data.length > 0 ? data.map((token) => (
            <TrendingTokenCard key={token.unit} token={token} title="Market Cap" />
          )) : <div className="text-left text-text-gray mt-8">No data.</div>}
        </div>
      )}
    </div>
  );
};

export default TrendingTokens;
