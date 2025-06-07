import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const unit = searchParams.get('unit');
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '100');

    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter is required' },
        { status: 400 }
      );
    }

    const data = await taptoolsService.getWalletTokenTrades(
      address,
      unit || undefined,
      page,
      perPage
    );
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching wallet token trades:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch wallet token trades' },
      { status: 500 }
    );
  }
}
