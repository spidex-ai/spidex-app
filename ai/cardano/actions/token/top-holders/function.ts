import type { CardanoTopHoldersArgumentsType, CardanoTopHoldersResultBodyType } from "./types";
import type { CardanoActionResult } from "../../cardano-action";
import { getTokenLargestAccounts } from "@/services/helius";
import { Connection, PublicKey } from "@solana/web3.js";
import { getAccount } from "@solana/spl-token";
import taptoolsService from "@/services/taptools";

export async function getTopHolders(
  args: CardanoTopHoldersArgumentsType
): Promise<CardanoActionResult<CardanoTopHoldersResultBodyType>> {
  try {
    let topHolders = await taptoolsService.getTopTokenHolders(args.tokenAddress, 1, args.limit);
    console.log("🚀 ~ topHolders:", topHolders)

    if (!topHolders || topHolders.length === 0) {
      throw new Error('Failed to fetch top holders');
    }
    const mintInfo = await taptoolsService.getTokenMcap(args.tokenAddress);
    const totalSupply = Number(BigInt(mintInfo.totalSupply));

    return {
      message: `The top holders have been retrieved and displayed to the user. Now ask them what they want to do next.`,
      body: {
        topHolders: await Promise.all(topHolders.map(async (holder) => {
          return {
            ...holder,
            percentageOwned: (holder.amount / totalSupply) * 100
          }
        })),
        percentageOwned: topHolders.reduce((acc, holder) => acc + Number(holder.amount), 0) / totalSupply
      }
    };
  } catch (error) {
    return {
      message: `Error getting top holders: ${error}`,
    };
  }
} 