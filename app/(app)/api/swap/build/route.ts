import { dexHunterService } from '@/services/dexhunter';
import { SwapPayload } from '@/services/dexhunter/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            buyerAddress,
            tokenIn,
            tokenOut,
            slippage,
            amountIn,
            txOptimization,
            blacklistedDexes
        } = body as SwapPayload;

        if (!buyerAddress) {
            return NextResponse.json(
                { error: 'Buyer address is required' },
                { status: 400 }
            );
        }


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

        const payload: SwapPayload = {
            buyerAddress,
            tokenIn,
            tokenOut,
            slippage: slippage ?? 1.0,
            amountIn,
            txOptimization: txOptimization ?? false,
            blacklistedDexes: blacklistedDexes ?? []
        };

        const data = await dexHunterService.buildSwap(payload);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error building swap transaction:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to build swap transaction' },
            { status: 500 }
        );
    }
}
