import type { SolanaActionResult } from "../../../solana/actions/solana-action";
import type { TokenChatData } from "@/types";
import { getMarketsList } from "@/services/birdeye";
import type { MarketItem } from "@/services/birdeye/types";

import type {
  TokenPageLiquidityResultBodyType,
  TokenPageLiquidityArgumentsType,
} from "./types";
import taptoolsService from "@/services/taptools";
import { TokenPool } from "@/services/taptools/types";

export async function getTokenPageLiquidity(
  token: TokenChatData,
  args: TokenPageLiquidityArgumentsType
): Promise<SolanaActionResult<any>> {
  try {
    // Get all markets (pools) for the token
    const markets = await taptoolsService.getTokenPools(token.address);
    console.log("🚀 ~ markets:", markets);

    // Calculate total liquidity across all pools
    const totalLiquidityUSD = markets.reduce(
      (acc: number, market: TokenPool) => acc + market.tokenALocked,
      0
    );

    // Find main pool (pool with highest liquidity)
    const mainPool = markets.reduce((a: TokenPool, b: TokenPool) =>
      a.tokenALocked > b.tokenALocked ? a : b
    );

    // Get volume metrics from the main pool
    // const volumeMetrics = {
    //   volume24h: mainPool.volume24h,
    //   volumeChange24h: mainPool.trade24hChangePercent || 0,
    // };

    // Calculate liquidity concentration
    const sortedPools = [...markets].sort(
      (a, b) => b.tokenALocked - a.tokenALocked
    );
    const topPoolShare = (mainPool.tokenALocked / totalLiquidityUSD) * 100;
    const top3PoolsShare = sortedPools
      .slice(0, 3)
      .reduce(
        (acc, pool) => acc + (pool.tokenALocked / totalLiquidityUSD) * 100,
        0
      );

    // Calculate liquidity health score (0-100)
    const healthScore = calculateLiquidityHealthScore({
      totalLiquidity: totalLiquidityUSD,
      concentration: { topPoolShare, top3PoolsShare },
    });

    const healthDescription = getLiquidityHealthDescription(healthScore);

    return {
      message: `Liquidity Analysis for ${token.symbol}:

1. Overall Liquidity:
   - Total liquidity across all pools: $${formatNumber(totalLiquidityUSD)}
   - Main pool (${mainPool.tokenB}): $${formatNumber(mainPool.tokenBLocked)}
   - Liquidity concentration: ${top3PoolsShare.toFixed(1)}% in top 3 pools
2. Concentration Analysis:
   - Top pool share: ${topPoolShare.toFixed(1)}%
   - Top 3 pools share: ${top3PoolsShare.toFixed(1)}%

Liquidity Health Score: ${healthScore}/100 - ${healthDescription}`,
      body: {
        totalLiquidityUSD,
        mainPool: {
          address: mainPool.lpTokenUnit,
          liquidity: mainPool.tokenALocked,
          source: mainPool.tokenA,
        },
        liquidityConcentration: {
          topPoolShare,
          top3PoolsShare,
        },
        liquidityHealth: {
          score: healthScore,
          description: healthDescription,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      message: `Error analyzing liquidity: ${error}`,
    };
  }
}

function calculateLiquidityHealthScore({
  totalLiquidity,
  concentration,
}: {
  totalLiquidity: number;
  concentration: { topPoolShare: number; top3PoolsShare: number };
}): number {
  // Score components (0-100 each)
  const liquidityScore = Math.min(100, (totalLiquidity / 1000000) * 20); // Up to $5M for max score
  const concentrationScore = Math.min(
    100,
    (1 - concentration.top3PoolsShare / 100) * 100
  ); // Lower concentration is better

  // Weighted average
  return Math.round(liquidityScore * 0.4 + 5 * 0.3 + concentrationScore * 0.3);
}

function getLiquidityHealthDescription(score: number): string {
  if (score >= 90)
    return "Excellent - Deep liquidity with healthy distribution and strong trading activity";
  if (score >= 75) return "Good - Sufficient liquidity and trading volume";
  if (score >= 60)
    return "Moderate - Adequate liquidity but may have concentration or volume concerns";
  if (score >= 40)
    return "Fair - Limited liquidity or high concentration in few pools";
  return "Poor - Shallow liquidity with concerning metrics";
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
  return num.toFixed(2);
}
