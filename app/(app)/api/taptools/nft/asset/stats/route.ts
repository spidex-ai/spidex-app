import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const policy = searchParams.get('policy');
    const name = searchParams.get('name');

    if (!policy || !name) {
      return NextResponse.json(
        { error: 'Policy ID and name are required' },
        { status: 400 }
      );
    }

    const data = await taptoolsService.getNFTAssetStats(policy, name);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching NFT asset stats:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch NFT asset stats' },
      { status: 500 }
    );
  }
}
