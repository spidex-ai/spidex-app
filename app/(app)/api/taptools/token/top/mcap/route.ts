import { taptoolsService } from '@/services/taptools';
import tokenCardanoService from '@/services/token-cardano';
import { keyBy } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '10');

    const data = await taptoolsService.getTopTokensByMcap(page, perPage);
    const tokenIds = data.map(token => token.unit);
    const [tokenDetails, tokenPrices] = await Promise.all([
      tokenCardanoService.batchTokenInfo(tokenIds, ['logo']),
      Promise.all(
        tokenIds.map(async token => {
          const tokenPrice = await taptoolsService.getTokenQuote(token, 'USD');
          return {
            unit: token,
            price: tokenPrice.price,
          };
        })
      ),
    ]);

    const mapTokenWithPrices = keyBy(tokenPrices, 'unit');

    const mapTokenWithDetails = keyBy(tokenDetails.subjects, 'subject');
    const tokens = data.map(token => {
      const tokenDetail = mapTokenWithDetails[token.unit];
      return {
        ...token,
        logo: tokenDetail?.logo.value,
        usdPrice: mapTokenWithPrices[token.unit]?.price,
      };
    });

    return NextResponse.json(tokens);
  } catch (error: any) {
    console.error('Error fetching top tokens by market cap:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch top tokens by market cap' },
      { status: 500 }
    );
  }
}
