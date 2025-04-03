import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter is required' },
        { status: 400 }
      );
    }

    const data = await taptoolsService.getAddressInfo(address);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching address info:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch address info' },
      { status: 500 }
    );
  }
}
