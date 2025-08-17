import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const unit = searchParams.get('unit');
    const interval = searchParams.get('interval');
    const numIntervals = searchParams.get('numIntervals')
      ? parseInt(searchParams.get('numIntervals') || '0')
      : undefined;
    const quote = searchParams.get('quote') || 'ADA';

    if (!unit || !interval) {
      return NextResponse.json(
        { error: 'Unit and interval parameters are required' },
        { status: 400 }
      );
    }

    const data = await taptoolsService.getTokenOHLCV(
      unit,
      interval,
      numIntervals,
      quote
    );
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching token OHLCV data:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch token OHLCV data' },
      { status: 500 }
    );
  }
}
