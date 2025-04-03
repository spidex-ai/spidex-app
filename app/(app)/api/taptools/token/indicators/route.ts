import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const unit = searchParams.get('unit');
        const interval = searchParams.get('interval');
        const items = searchParams.get('items') ? parseInt(searchParams.get('items')!) : undefined;
        const indicator = searchParams.get('indicator') || 'ma';
        const length = searchParams.get('length') ? parseInt(searchParams.get('length')!) : undefined;
        const smoothingFactor = searchParams.get('smoothingFactor') ? parseFloat(searchParams.get('smoothingFactor')!) : undefined;
        const fastLength = searchParams.get('fastLength') ? parseInt(searchParams.get('fastLength')!) : undefined;
        const slowLength = searchParams.get('slowLength') ? parseInt(searchParams.get('slowLength')!) : undefined;
        const signalLength = searchParams.get('signalLength') ? parseInt(searchParams.get('signalLength')!) : undefined;
        const stdMult = searchParams.get('stdMult') ? parseFloat(searchParams.get('stdMult')!) : undefined;
        const quote = searchParams.get('quote') || 'ADA';

        if (!unit || !interval) {
            return NextResponse.json(
                { error: 'Unit and interval parameters are required' },
                { status: 400 }
            );
        }

        const data = await taptoolsService.getTokenIndicators(
            unit,
            interval,
            items,
            indicator,
            length,
            smoothingFactor,
            fastLength,
            slowLength,
            signalLength,
            stdMult,
            quote
        );
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching token indicators:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch token indicators' },
            { status: 500 }
        );
    }
} 