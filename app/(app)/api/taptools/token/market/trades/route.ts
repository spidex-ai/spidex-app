import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const unit = searchParams.get('unit');
    const timeframe = searchParams.get('timeframe') || '24h';
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '100');

    if (!unit) {
      return NextResponse.json(
        { error: 'Unit parameter is required' },
        { status: 400 }
      );
    }

    const data = await taptoolsService.getTokenTrades(
      unit,
      timeframe,
      page,
      perPage
    );
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching token trades:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch token trades' },
      { status: 500 }
    );
  }
}
