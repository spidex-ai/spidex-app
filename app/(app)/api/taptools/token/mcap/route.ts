import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const unit = searchParams.get('unit');

    if (!unit) {
      return NextResponse.json(
        { error: 'Unit parameter is required' },
        { status: 400 }
      );
    }

    const data = await taptoolsService.getTokenMcap(unit);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching token market cap:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch token market cap' },
      { status: 500 }
    );
  }
}
