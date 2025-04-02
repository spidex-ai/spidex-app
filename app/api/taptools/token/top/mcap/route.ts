import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '10');

    const data = await taptoolsService.getTopTokensByMcap(page, perPage);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching top tokens by market cap:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch top tokens by market cap' },
      { status: 500 }
    );
  }
}
