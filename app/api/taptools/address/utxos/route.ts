import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '100');

    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter is required' },
        { status: 400 }
      );
    }

    const data = await taptoolsService.getAddressUTXOs(address, page, perPage);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching address UTXOs:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch address UTXOs' },
      { status: 500 }
    );
  }
}
