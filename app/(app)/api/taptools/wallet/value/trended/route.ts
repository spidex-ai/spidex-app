import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const address = searchParams.get('address');
        const timeframe = searchParams.get('timeframe') || '30d';
        const quote = searchParams.get('quote') || 'ADA';

        if (!address) {
            return NextResponse.json(
                { error: 'Address parameter is required' },
                { status: 400 }
            );
        }

        const data = await taptoolsService.getWalletValueTrended(
            address,
            timeframe,
            quote
        );
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching wallet value trended:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch wallet value trended' },
            { status: 500 }
        );
    }
} 