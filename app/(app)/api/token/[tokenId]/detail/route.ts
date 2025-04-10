import { dexHunterService } from "@/services/dexhunter";
import tokenCardanoService from "@/services/token-cardano";
import { BatchTokenCardanoInfo } from "@/services/token-cardano/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tokenId: string }> }
) {
  try {
    const { tokenId } = await params;
    if (!tokenId) {
      return NextResponse.json(
        { error: "Invalid request. Query is required." },
        { status: 400 }
      );
    }
    const data = await dexHunterService.getTokenDetail(tokenId);
    const tokenDetails: BatchTokenCardanoInfo =
      await tokenCardanoService.batchTokenInfo([data.token_id], ["logo"]);
    const tokenDetail = tokenDetails.subjects[0];
    const tokensWithDetails = {
      ...data,
      unit: tokenDetail.subject,
      logo: tokenDetail?.logo.value,
    };
    return NextResponse.json(tokensWithDetails);
  } catch (error: any) {
    console.error("Error fetching token search results:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch token search results" },
      { status: 500 }
    );
  }
}
