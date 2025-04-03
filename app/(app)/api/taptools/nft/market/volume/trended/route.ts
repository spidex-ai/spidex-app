import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const timeframe = searchParams.get('timeframe') || '30d';

        const data = await taptoolsService.getNFTMarketVolumeTrended(timeframe);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching NFT market volume trended:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch NFT market volume trended' },
            { status: 500 }
        );
    }
} 