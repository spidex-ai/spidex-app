import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { units } = body;

    if (!units || !Array.isArray(units)) {
      return NextResponse.json(
        { error: 'Invalid request. Units must be an array.' },
        { status: 400 }
      );
    }

    const data = await taptoolsService.getTokenPrices(units);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching token prices:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch token prices' },
      { status: 500 }
    );
  }
}
