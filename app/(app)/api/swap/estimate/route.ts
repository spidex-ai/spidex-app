import { dexHunterService } from '@/services/dexhunter';
import { EsitmateSwapPayload, SwapPayload } from '@/services/dexhunter/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            token_in,
            token_out,
            slippage,
            amount_in,
            blacklisted_dexes
        } = body as SwapPayload;


        if (!token_out && !token_in) {
            return NextResponse.json(
                { error: 'Input or output token is required' },
                { status: 400 }
            );
        }

        if (!amount_in) {
            return NextResponse.json(
                { error: 'Input amount is required' },
                { status: 400 }
            );
        }

        const payload: EsitmateSwapPayload = {
            token_in,
            token_out,
            slippage: slippage ?? 1.0,
            amount_in,
            blacklisted_dexes: blacklisted_dexes ?? []
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
