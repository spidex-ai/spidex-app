import { dexHunterService } from '@/services/dexhunter';
import taptoolsService from '@/services/taptools';
import tokenCardanoService from '@/services/token-cardano';
import { BatchTokenCardanoSubject } from '@/services/token-cardano/types';
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
        const [tokenDetails, tokenUsdPrices, tokenPrices] = await Promise.all([
            tokenCardanoService.batchTokenInfo(tokenIds, ['logo']),
            Promise.all(tokenIds.map(async (token) => {
                const tokenPrice = await taptoolsService.getTokenQuote(token, 'USD');
                return {
                    unit: token,
                    price: tokenPrice.price
                };
            })),
            taptoolsService.getTokenPrices(tokenIds)
        ]);
        const mapTokenWithDetails = keyBy<BatchTokenCardanoSubject>(tokenDetails.subjects, (subject) => subject.subject);
        const mapTokenWithPrices = keyBy(tokenUsdPrices, 'unit');
        const tokensWithDetails = map(data, (token) => ({
            ...token,
            unit: token.token_id,
            price: tokenPrices[token.token_id],
            logo: mapTokenWithDetails[token.token_id]?.logo.value,
            usdPrice: mapTokenWithPrices[token.token_id]?.price,
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
