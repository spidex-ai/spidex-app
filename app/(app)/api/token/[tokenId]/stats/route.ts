import taptoolsService from '@/services/taptools';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, { params }: { params: Promise<{ tokenId: string }> }) {
    try {
        const { tokenId } = await params;
        if (!tokenId) {
            return NextResponse.json(
                { error: 'Invalid request. Query is required.' },
                { status: 400 }
            );
        }

        const [
            usdPrice,
            mcap,
            holders,
            tradingStats
        ] = await Promise.all([
            taptoolsService.getTokenQuote(tokenId, 'USD'),
            taptoolsService.getTokenMcap(tokenId),
            taptoolsService.getTokenHolders(tokenId),
            taptoolsService.getTokenTradingStats(tokenId, '24H')
        ]);

        const tokenStats = {
            price: mcap.price,
            usdPrice: usdPrice.price,
            mcap,
            holders: holders.holders,
            "24h": tradingStats
        }


        return NextResponse.json(tokenStats);
    } catch (error: any) {
        console.error('Error fetching token stat results:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch token stat results' },
            { status: 500 }
        );
    }
}
