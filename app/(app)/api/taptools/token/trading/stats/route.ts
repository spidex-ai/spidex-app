import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const unit = searchParams.get('unit');
    const timeframe = searchParams.get('timeframe') || '24h';

    if (!unit) {
      return NextResponse.json(
        { error: 'Unit parameter is required' },
        { status: 400 }
      );
    }

    const data = await taptoolsService.getTokenTradingStats(unit, timeframe);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching token trading stats:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch token trading stats' },
      { status: 500 }
    );
  }
}
