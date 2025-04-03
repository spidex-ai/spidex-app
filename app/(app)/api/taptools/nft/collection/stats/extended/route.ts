import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const policy = searchParams.get('policy');
    const timeframe = searchParams.get('timeframe') || '24h';

    if (!policy) {
      return NextResponse.json(
        { error: 'Policy ID is required' },
        { status: 400 }
      );
    }

    const data = await taptoolsService.getNFTCollectionStatsExtended(policy, timeframe);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching NFT collection extended stats:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch NFT collection extended stats' },
      { status: 500 }
    );
  }
}
