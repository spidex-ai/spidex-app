import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeframe = searchParams.get('timeframe') || '24h';
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '10');

    const data = await taptoolsService.getTopTokensByVolume(timeframe, page, perPage);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching top tokens by volume:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch top tokens by volume' },
      { status: 500 }
    );
  }
}
