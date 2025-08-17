import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const policy = searchParams.get('policy');
    const timeframe = searchParams.get('timeframe') || '30d';

    if (!policy) {
      return NextResponse.json(
        { error: 'Policy parameter is required' },
        { status: 400 }
      );
    }

    const data = await taptoolsService.getNFTCollectionTrendedHolders(
      policy,
      timeframe
    );
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching NFT collection trended holders:', error);
    return NextResponse.json(
      {
        error:
          error.message || 'Failed to fetch NFT collection trended holders',
      },
      { status: 500 }
    );
  }
}
