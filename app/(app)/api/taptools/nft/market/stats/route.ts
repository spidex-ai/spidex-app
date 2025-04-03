import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeframe = searchParams.get('timeframe') || '24h';

    const data = await taptoolsService.getNFTMarketStats(timeframe);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching NFT market stats:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch NFT market stats' },
      { status: 500 }
    );
  }
}
