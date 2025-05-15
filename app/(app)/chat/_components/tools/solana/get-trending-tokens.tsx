import React from "react";

import { Card } from "@/components/ui";

import ToolCard from "../tool-card";

import type { ToolInvocation } from "ai";
import type {
  CardanoGetTrendingTokensResultBodyType,
  CardanoGetTrendingTokensResultType,
} from "@/ai";

import SaveToken from "@/app/(app)/_components/save-token";
import Link from "next/link";
import { TopTokenMcap } from "@/services/taptools/types";
import { getLogoUrl } from "@/app/utils/logo";

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const GetTrendingTokens: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting Trending Tokens...`}
      result={{
        heading: (result: CardanoGetTrendingTokensResultType) =>
          result.body
            ? `Fetched Trending Tokens`
            : `Failed to fetch trending tokens`,
        body: (result: CardanoGetTrendingTokensResultType) =>
          result.body ? (
            <TrendingTokens body={result.body} />
          ) : (
            "No trending tokens found"
          ),
      }}
      defaultOpen={true}
      prevToolAgent={prevToolAgent}
      className="w-full"
    />
  );
};

const TrendingTokens = ({
  body,
}: {
  body: CardanoGetTrendingTokensResultBodyType;
}) => {
  console.log("body:::::: ", body);
  // return <div>this is trending tokens</div>
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {body.tokens.map((token: TopTokenMcap) => (
        <TokenCard key={token.unit} token={token} />
      ))}
    </div>
  );
};

const TokenCard = ({ token }: { token: TopTokenMcap }) => {
  return (
    <Link href={`/token/${token.unit}`}>
      <Card className="flex flex-col gap-2 p-2 justify-center hover:border-brand-600 dark:hover:border-brand-600 transition-all duration-300">
        <div className="flex flex-row items-center gap-2 justify-between">
          <div className="flex flex-row items-center gap-2">
            {token?.logo ? (
              <img
                src={getLogoUrl(token.logo)}
                alt={token.ticker}
                className="w-10 h-10 rounded-full"
              />
            ) : null}
            <div className="flex flex-col">
              <p className="text-sm font-bold">
                {token.name} ({token.ticker})
              </p>
              <p className="text-xs text-muted-foreground">
                $
                {token.price < 0.0001 ? "~0.0001" : token.price.toLocaleString(undefined, {
                  maximumFractionDigits: 5,
                })}
              </p>
            </div>
          </div>
          <SaveToken address={token.unit} />
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">
            Market Cap: ${token?.mcap < 0.0001 ? "~0.0001" : token?.mcap.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default GetTrendingTokens;
