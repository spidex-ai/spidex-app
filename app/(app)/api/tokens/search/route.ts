import { dexHunterService } from '@/services/dexhunter';
import tokenCardanoService from '@/services/token-cardano';
import { BatchTokenCardanoInfo, BatchTokenCardanoSubject } from '@/services/token-cardano/types';
import { keyBy, map } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query');
        const verified = searchParams.get('verified') === 'true';
        const page = parseInt(searchParams.get('page') || '0');
        const limit = parseInt(searchParams.get('limit') || '10');

        if (!query) {
            return NextResponse.json(
                { error: 'Invalid request. Query is required.' },
                { status: 400 }
            );
        }
        const data = await dexHunterService.searchToken(query, verified, page, limit);
        const tokenIds = map(data, 'token_id');
        const tokenDetails: BatchTokenCardanoInfo = await tokenCardanoService.batchTokenInfo(tokenIds, ['logo']);
        const mapTokenWithDetails = keyBy<BatchTokenCardanoSubject>(tokenDetails.subjects, (subject) => subject.subject);
        const tokensWithDetails = map(data, (token) => ({
            ...token,
            logo: mapTokenWithDetails[token.token_id]?.logo.value,
        }));
        return NextResponse.json(tokensWithDetails);
    } catch (error: any) {
        console.error('Error fetching token search results:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch token search results' },
            { status: 500 }
        );
    }
}
