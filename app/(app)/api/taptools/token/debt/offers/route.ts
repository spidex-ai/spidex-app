import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const unit = searchParams.get('unit');
        const include = searchParams.get('include') || 'collateral,debt';
        const sortBy = searchParams.get('sortBy') || 'time';
        const order = searchParams.get('order') || 'desc';
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('perPage') || '100');

        if (!unit) {
            return NextResponse.json(
                { error: 'Unit parameter is required' },
                { status: 400 }
            );
        }

        const data = await taptoolsService.getTokenDebtOffers(
            unit,
            include,
            sortBy,
            order,
            page,
            perPage
        );
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching token debt offers:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch token debt offers' },
            { status: 500 }
        );
    }
} 