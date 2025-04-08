// app/(app)/api/swap/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dexHunterService } from '@/services/dexhunter';
import { SubmitSwapPayload } from '@/services/dexhunter/types';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { txCbor, signatures } = body as SubmitSwapPayload;

        if (!txCbor) {
            return NextResponse.json(
                { error: 'Transaction CBOR is required' },
                { status: 400 }
            );
        }

        if (!signatures) {
            return NextResponse.json(
                { error: 'Signature is required' },
                { status: 400 }
            );
        }

        const payload: SubmitSwapPayload = {
            txCbor,
            signatures
        };

        const submitSwapResponse = await dexHunterService.submitSwap(payload);
        return NextResponse.json(submitSwapResponse);
    } catch (error: any) {
        console.error('Error submitting swap transaction:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to submit swap transaction' },
            { status: 500 }
        );
    }
}