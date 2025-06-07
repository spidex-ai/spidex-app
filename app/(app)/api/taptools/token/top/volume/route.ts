import { NextRequest, NextResponse } from 'next/server';
import { taptoolsService } from '@/services/taptools';
import tokenCardanoService from '@/services/token-cardano';
import { keyBy } from 'lodash';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeframe = searchParams.get('timeframe') || '24h';
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '10');

    const data = await taptoolsService.getTopTokensByVolume(
      timeframe,
      page,
      perPage
    );
    const tokenIds = data.map(token => token.unit);
    const [tokenDetails, tokenUsdPrices] = await Promise.all([
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
    const mapTokenWithPrices = keyBy(tokenUsdPrices, 'unit');
    const mapTokenWithDetails = keyBy(tokenDetails.subjects, 'subject');
    const tokensWithPrices = data.map(token => ({
      ...token,
      usdPrice: mapTokenWithPrices[token.unit]?.price,
      logo: mapTokenWithDetails[token.unit]?.logo.value,
    }));
    return NextResponse.json(tokensWithPrices);
  } catch (error: any) {
    console.error('Error fetching top tokens by volume:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch top tokens by volume' },
      { status: 500 }
    );
  }
}
