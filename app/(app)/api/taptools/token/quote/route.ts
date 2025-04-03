import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const unit = searchParams.get('unit');
    const quote = searchParams.get('quote');

    if (!unit || !quote) {
      return NextResponse.json(
        { error: 'Unit and quote parameters are required' },
        { status: 400 }
      );
    }

    const data = await taptoolsService.getTokenQuote(unit, quote);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching token quote:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch token quote' },
      { status: 500 }
    );
  }
}
