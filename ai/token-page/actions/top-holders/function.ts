import { getTopTokenHolders } from "@/services/hellomoon";
import { getStreamsByMint } from "@/services/streamflow";

import { knownAddresses } from "@/lib/known-addresses";

import type {
  TokenPageTopHoldersResultBodyType,
  TokenPageTopHoldersArgumentsType,
} from "./types";
import type { SolanaActionResult } from "../../../solana/actions/solana-action";
import type { TokenChatData } from "@/types";
import { AddressType, KnownAddress } from "@/types/known-address";
import taptoolsService from "@/services/taptools";

export async function getTokenPageTopHolders(
  token: TokenChatData,
  _: TokenPageTopHoldersArgumentsType
): Promise<SolanaActionResult<any>> {
  try {
    const numHolders = 50;

    const [topHolders, tokenDebtLoan, totalSupply] = await Promise.all([
      taptoolsService.getTopTokenHolders(token.address, 1, numHolders),
      taptoolsService.getTokenDebtLoans(
        token.address,
        "collateral,debt",
        undefined,
        undefined,
        1,
        100
      ),
      taptoolsService.getTokenMcap(token.address),
    ]);
    console.log("🚀 ~ totalSupply:", totalSupply);
    console.log("🚀 ~ topHolders:", topHolders);

    // Calculate basic holder percentages
    const top10Holders = topHolders
      .slice(0, 10)
      .reduce((acc, curr) => acc + curr.amount, 0);
    const top20Holders = topHolders
      .slice(0, 20)
      .reduce((acc, curr) => acc + curr.amount, 0);

    const top10HoldersPercent = top10Holders / totalSupply.totalSupply;
    const top20HoldersPercent = top20Holders / totalSupply.totalSupply;
    const totalDebt = tokenDebtLoan.slice(0, 100).reduce((acc, curr) => {
      const amount = curr.debtAmount || 0;
      return acc + amount;
    }, 0);
    const totalCollateral = tokenDebtLoan.slice(0, 100).reduce((acc, curr) => {
      const amount = curr.collateralAmount || 0;
      return acc + amount;
    }, 0);

    const totalDebtPercent = totalDebt / totalSupply.totalSupply;
    const totalCollateralPercent = totalCollateral / totalSupply.totalSupply;
    // Calculate concentration metrics
    const top5HoldersPercent = topHolders
      .slice(0, 5)
      .reduce((acc, curr) => acc + curr.amount / totalSupply.totalSupply, 0);
    const largestHolder = topHolders[0]?.amount / totalSupply.totalSupply || 0;

    // Calculate distribution patterns
    const totalAnalyzedPercent =
      top20HoldersPercent + totalDebtPercent + totalCollateralPercent;
    const remainingSupplyPercent = Math.max(0, 1 - totalAnalyzedPercent);

    // Calculate average holdings
    const avgTop10Holding = top10HoldersPercent / 10;
    const avgExchangeHolding = totalDebtPercent / 100;

    // Generate distribution assessment
    const concentrationLevel =
      top10HoldersPercent > 0.5
        ? "Highly Concentrated"
        : top10HoldersPercent > 0.3
        ? "Moderately Concentrated"
        : "Well Distributed";

    const exchangePresence =
      totalDebtPercent > 0.2
        ? "Significant"
        : totalCollateralPercent > 0.1
        ? "Moderate"
        : "Limited";

    return {
      message: `Analysis of token distribution patterns:

1. Concentration Metrics:
   - The largest single holder controls ${(largestHolder * 100).toFixed(
     2
   )}% of the supply
   - Top 5 holders control ${(top5HoldersPercent * 100).toFixed(2)}%
   - Top 10 holders control ${(top10HoldersPercent * 100).toFixed(2)}%
   - Top 20 holders control ${(top20HoldersPercent * 100).toFixed(2)}%

2. Debt & Collateral Distribution:
   - ${(totalDebtPercent * 100).toFixed(
     2
   )}% is in debt across ${5} exchange addresses
   - ${(totalCollateralPercent * 100).toFixed(2)}% is locked in collateral
   - Average exchange holding is ${(avgExchangeHolding * 100).toFixed(2)}%

3. Distribution Assessment:
   - Token ownership appears ${concentrationLevel}
   - Exchange presence is ${exchangePresence}
   - ${(remainingSupplyPercent * 100).toFixed(
     2
   )}% is distributed among smaller holders

4. Key Metrics:
   - Average top 10 holder owns ${(avgTop10Holding * 100).toFixed(2)}%
   - Ratio of collateral to debt tokens: ${(
     totalCollateralPercent / (totalDebtPercent || 1)
   ).toFixed(2)}x
   
Discuss only the notable metrics unless asked for further details.`,
      body: {
        top5HoldersPercent,
        top10HoldersPercent,
        top20HoldersPercent,
        totalDebtPercent,
        totalCollateralPercent,
        largestHolder,
        remainingSupplyPercent,
        avgTop10Holding,
        avgExchangeHolding,
        concentrationLevel,
        exchangePresence,
        numExchanges: 5,
        numVestingContracts: 10,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      message: `Error getting top holders: ${error}`,
    };
  }
}
