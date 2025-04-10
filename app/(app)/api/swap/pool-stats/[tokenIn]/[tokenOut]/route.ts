import { dexHunterService } from '@/services/dexhunter';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ tokenIn: string; tokenOut: string }> }) {
    try {
        const { tokenIn, tokenOut } = await params;

        if (!tokenOut || !tokenIn) {
            return NextResponse.json(
                { error: 'Input or output token is required' },
                { status: 400 }
            );
        }

        const data = await dexHunterService.poolStats(tokenIn, tokenOut);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error building swap transaction:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to build swap transaction' },
            { status: 500 }
        );
    }
}
