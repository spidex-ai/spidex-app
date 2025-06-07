import taptoolsService from '@/services/taptools';

import type {
  CardanoGetTrendingTokensArgumentsType,
  CardanoGetTrendingTokensResultBodyType,
} from './types';
import { CardanoActionResult } from '@/ai/cardano/actions/cardano-action';
import tokenCardanoService from '@/services/token-cardano';
import { keyBy } from 'lodash';
import s3Service from '@/services/s3';

/**
 * Gets the trending tokens from Birdeye API.
 *
 * @param solanaKit - The Solana agent kit instance
 * @param args - The input arguments for the action
 * @returns A message containing the trending tokens information
 */
export async function getTrendingTokens(
  args: CardanoGetTrendingTokensArgumentsType
): Promise<CardanoActionResult<CardanoGetTrendingTokensResultBodyType>> {
  try {
    const response = await fetchTopTokenMcap(1, args.limit);

    for (const token of response) {
      const existedKey = await s3Service.keyExists(`${token.ticker}.png`);
      if (existedKey) {
        token.logo = encodeURI(`${process.env.S3_URL}/${token.ticker}.png`);
      } else {
        token.logo = await s3Service.uploadBase64Image(
          token.logo,
          `${token.ticker}.png`
        );
      }
    }

    return {
      message: `Found ${response.length} trending tokens. The user is shown the tokens, do not list them. Ask the user what they want to do with the coin.`,
      body: {
        tokens: response,
      },
    };
  } catch (error) {
    return {
      message: `Error getting trending tokens: ${error}`,
      body: {
        tokens: [],
      },
    };
  }
}

export const fetchTopTokenMcap = async (page: number, perPage: number) => {
  try {
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
    return tokens;
  } catch (error) {
    console.error('Error fetching top token mcap:', error);
    return [];
  }
};
