import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const address = searchParams.get('address');

        if (!address) {
            return NextResponse.json(
                { error: 'Address parameter is required' },
                { status: 400 }
            );
        }

        const data = await taptoolsService.getWalletPortfolioPositions(address);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching wallet portfolio positions:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch wallet portfolio positions' },
            { status: 500 }
        );
    }
} 