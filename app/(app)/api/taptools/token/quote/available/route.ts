import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    console.log(request);
    const data = await taptoolsService.getAvailableQuotes();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching available quotes:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch available quotes' },
      { status: 500 }
    );
  }
}
