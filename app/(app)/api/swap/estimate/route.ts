import { dexHunterService } from '@/services/dexhunter';
import { EsitmateSwapPayload, SwapPayload } from '@/services/dexhunter/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            tokenIn,
            tokenOut,
            slippage,
            amountIn,
            blacklistedDexes
        } = body as SwapPayload;


        if (!tokenOut && !tokenIn) {
            return NextResponse.json(
                { error: 'Input or output token is required' },
                { status: 400 }
            );
        }

        if (!amountIn) {
            return NextResponse.json(
                { error: 'Input amount is required' },
                { status: 400 }
            );
        }

        const payload: EsitmateSwapPayload = {
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            slippage: slippage ?? 1.0,
            amountIn: amountIn,
            blacklistedDexes: blacklistedDexes ?? []
        };

        const data = await dexHunterService.estimateSwap(payload);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error building swap transaction:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to build swap transaction' },
            { status: 500 }
        );
    }
}
