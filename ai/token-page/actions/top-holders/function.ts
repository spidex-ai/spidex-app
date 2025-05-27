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

interface TopHolder {
  address: string;
  amount: number;
  ownershipPercentage: number;
  totalPrice: number;
  usdTotalPrice: number;
}

export async function getTokenPageTopHolders(
  token: TokenChatData,
  _: TokenPageTopHoldersArgumentsType
): Promise<SolanaActionResult<any>> {
  try {
    const numHolders = 50;

    const [topHoldersResponse, tokenDebtLoan, totalSupply] = await Promise.all([
      fetch(
        `https://core.spidex.ag/api/tokens/${token.address}/top-holders?limit=20&page=1`,
        {
          method: "GET",
        }
      ),
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

    const responseData = await topHoldersResponse.json();
    console.log("API Response:", responseData);

    // Ensure we have an array of holders
    const topHolders: TopHolder[] = Array.isArray(responseData)
      ? responseData
      : responseData.data || responseData.holders || [];

    if (!Array.isArray(topHolders)) {
      throw new Error(
        "Invalid response format: top holders data is not an array"
      );
    }

    // Calculate basic holder percentages
    const top10Holders = topHolders
      .slice(0, 10)
      .reduce(
        (acc: number, curr: TopHolder) => acc + curr.ownershipPercentage,
        0
      );
    console.log("🚀 ~ top10Holders:", top10Holders);
    const top20Holders = topHolders
      .slice(0, 20)
      .reduce(
        (acc: number, curr: TopHolder) => acc + curr.ownershipPercentage,
        0
      );

    const top10HoldersPercent = top10Holders;
    const top20HoldersPercent = top20Holders;

    const totalDebt = tokenDebtLoan
      .slice(0, 100)
      .reduce((acc: number, curr: any) => {
        const amount = curr.debtAmount || 0;
        return acc + amount;
      }, 0);

    const totalCollateral = tokenDebtLoan
      .slice(0, 100)
      .reduce((acc: number, curr: any) => {
        const amount = curr.collateralAmount || 0;
        return acc + amount;
      }, 0);

    const totalDebtPercent = totalDebt / totalSupply.totalSupply;
    const totalCollateralPercent = totalCollateral / totalSupply.totalSupply;

    // Calculate concentration metrics
    const top5HoldersPercent = topHolders
      .slice(0, 5)
      .reduce(
        (acc: number, curr: TopHolder) => acc + curr.ownershipPercentage,
        0
      );
    const largestHolder = topHolders[0]?.ownershipPercentage || 0;

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
   - The largest single holder controls ${largestHolder}% of the supply
   - Top 5 holders control ${top5HoldersPercent}%
   - Top 10 holders control ${top10HoldersPercent}%
   - Top 20 holders control ${top20HoldersPercent}%

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
   - Average top 10 holder owns ${avgTop10Holding}%
   - Ratio of collateral to debt tokens: ${
     totalCollateralPercent / (totalDebtPercent || 1)
   }x
   
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
    console.error("Error in getTokenPageTopHolders:", error);
    return {
      message: `Error getting top holders: ${error}`,
    };
  }
}
