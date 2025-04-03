import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const ranking = searchParams.get('ranking');
        const items = parseInt(searchParams.get('items') || '25');

        if (!ranking) {
            return NextResponse.json(
                { error: 'Ranking parameter is required' },
                { status: 400 }
            );
        }

        const data = await taptoolsService.getNFTTopRankings(ranking, items);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching NFT top rankings:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch NFT top rankings' },
            { status: 500 }
        );
    }
} 