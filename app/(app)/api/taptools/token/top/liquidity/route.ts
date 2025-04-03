import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '10');

    const data = await taptoolsService.getTopTokensByLiquidity(page, perPage);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching top tokens by liquidity:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch top tokens by liquidity' },
      { status: 500 }
    );
  }
}
