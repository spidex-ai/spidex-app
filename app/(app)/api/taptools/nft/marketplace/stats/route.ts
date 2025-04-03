import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const timeframe = searchParams.get('timeframe') || '7d';
        const marketplace = searchParams.get('marketplace');
        const lastDay = parseInt(searchParams.get('lastDay') || '0');

        const data = await taptoolsService.getNFTMarketplaceStats(
            timeframe,
            marketplace || undefined,
            lastDay
        );
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching NFT marketplace stats:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch NFT marketplace stats' },
            { status: 500 }
        );
    }
} 