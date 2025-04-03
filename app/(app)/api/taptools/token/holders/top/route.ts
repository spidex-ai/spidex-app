import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const unit = searchParams.get('unit');
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '10');

    if (!unit) {
      return NextResponse.json(
        { error: 'Unit parameter is required' },
        { status: 400 }
      );
    }

    const data = await taptoolsService.getTopTokenHolders(unit, page, perPage);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching top token holders:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch top token holders' },
      { status: 500 }
    );
  }
}
