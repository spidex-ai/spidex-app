import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const policy = searchParams.get('policy');
        const interval = searchParams.get('interval');
        const numIntervals = searchParams.get('numIntervals') ? parseInt(searchParams.get('numIntervals')!) : undefined;

        if (!policy || !interval) {
            return NextResponse.json(
                { error: 'Policy and interval parameters are required' },
                { status: 400 }
            );
        }

        const data = await taptoolsService.getNFTCollectionTrendedVolume(
            policy,
            interval,
            numIntervals
        );
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching NFT collection trended volume:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch NFT collection trended volume' },
            { status: 500 }
        );
    }
} 