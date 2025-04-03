import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const quote = searchParams.get('quote') || 'ADA';

    const data = await taptoolsService.getMarketStats(quote);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching market stats:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch market stats' },
      { status: 500 }
    );
  }
}
