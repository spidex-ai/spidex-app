import dexHunterService from '@/services/dexhunter';
import type { CardanoActionResult } from '../../cardano-action';
import type {
  CardanoGetTokenDataArgumentsType,
  CardanoGetTokenDataResultBodyType,
} from './types';
import taptoolsService from '@/services/taptools';
import { TokenDetail, TokenStats } from '@/services/taptools/types';
import tokenCardanoService from '@/services/token-cardano';
import s3Service from '@/services/s3';

/**
 * Gets the token data for a given ticker.
 *
 * @param connection - The Solana connection instance
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
export async function getTokenData(
  args: CardanoGetTokenDataArgumentsType
): Promise<CardanoActionResult<CardanoGetTokenDataResultBodyType>> {
  console.log('🚀 ~ args:', args);
  try {
    let tokenAddress = null;
    if (
      args.search.toLowerCase() == 'ada' ||
      args.search.toLowerCase() == 'cardano' ||
      args.search.toLowerCase() == 'cardano (ada)'
    ) {
      const [tokenResponse, cmcLinksResponse, coreDetailResponse] =
        await Promise.all([
          fetch(
            `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=2010`,
            {
              method: 'GET',
              headers: {
                'X-CMC_PRO_API_KEY': process.env
                  .COINMARKETCAP_API_KEY as string,
              },
            }
          ),
          fetch(
            `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=2010`,
            {
              method: 'GET',
              headers: {
                'X-CMC_PRO_API_KEY': process.env
                  .COINMARKETCAP_API_KEY as string,
              },
            }
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}/tokens/lovelace`,
            {
              method: 'GET',
            }
          ),
        ]);

      const [tokenDetail, cmcLinksData, detail] = await Promise.all([
        tokenResponse.json(),
        cmcLinksResponse.json(),
        coreDetailResponse.json(),
      ]);

      console.log('🚀 ~ detail:', detail);
      console.log('🚀 ~ tokenDetail:', tokenDetail.data['2010'].quote.USD);
      console.log(tokenDetail.data['2010']);
      console.log('🚀 ~ cmcLinksData:', cmcLinksData);

      const tokenStats: TokenStats = {
        price: tokenDetail.data['2010'].quote.USD.price,
        usdPrice: tokenDetail.data['2010'].quote.USD.price,
        mcap: {
          ticker: 'ADA',
          circSupply: tokenDetail.data['2010'].circulating_supply,
          totalSupply: tokenDetail.data['2010'].total_supply,
          price: detail.data.price,
          mcap: tokenDetail.data['2010'].quote.USD.market_cap,
          fdv: tokenDetail.data['2010'].quote.USD.fully_diluted_market_cap,
        },
        holders: tokenDetail.data['2010'].quote.USD.holders,
        tokenAddress: 'lovelace',
        '24h': {
          ...tokenDetail.data['2010'].quote.USD['24h'],
          buyers: 0,
          sellers: 0,
          buyVolume: tokenDetail.data['2010'].quote.USD.volume_24h,
          sellVolume: 0,
          buys: 0,
          sells: 0,
        },
        tokenLogo: detail.data.logo,
        tokenLinks: {
          description: cmcLinksData.data['2010'].description,
          twitter: cmcLinksData.data['2010'].urls.twitter[0],
          website: cmcLinksData.data['2010'].urls.website[0],
        },
      };

      console.log('🚀 ~ tokenStats:', tokenStats);

      return {
        message: `Token data for ${args.search}`,
        body: {
          token: tokenStats as any,
        },
      };
    } else {
      const response = await dexHunterService.searchToken(
        args.search,
        true,
        0,
        1
      );
      if (!response) {
        throw new Error('Failed to fetch search results');
      }

      tokenAddress = response[0]?.token_id;

      const [
        tokenDetail,
        usdPrice,
        mcap,
        holders,
        tradingStats,
        tokenPriceChange,
        tokenLinks,
      ] = await Promise.all([
        tokenCardanoService.tokenInfo(tokenAddress),
        taptoolsService.getTokenQuote(tokenAddress, 'USD'),
        taptoolsService.getTokenMcap(tokenAddress),
        taptoolsService.getTokenHolders(tokenAddress),
        taptoolsService.getTokenTradingStats(tokenAddress, '24H'),
        taptoolsService.getTokenPriceChanges(tokenAddress),
        taptoolsService.getTokenLinks(tokenAddress),
      ]);
      console.log('🚀 ~ tokenDetail:', tokenDetail);
      let tokenLogo: string;

      const existedKey = await s3Service.keyExists(`${response[0].ticker}.png`);
      if (existedKey) {
        tokenLogo = encodeURI(
          `${process.env.S3_URL}/${response[0].ticker}.png`
        );
      } else {
        tokenLogo = await s3Service.uploadBase64Image(
          tokenDetail.logo.value,
          `${response[0].ticker}.png`
        );
      }
      const tokenStats: TokenStats = {
        price: usdPrice.price,
        usdPrice: mcap.price,
        mcap,
        holders: holders.holders,
        '24h': tradingStats,
        tokenAddress,
        tokenLogo,
        tokenPriceChange,
        tokenLinks,
      };

      return {
        message: `Token data for ${args.search}`,
        body: {
          token: tokenStats as any,
        },
      };
    }

    // console.log("🚀 ~ response:", response);
    // if (!tokenAddress) {
    //   return {
    //     message: `No token found for ${args.search}`,
    //   };
    // }
  } catch (error) {
    console.error(error);
    return {
      message: `Error getting token data: ${error}`,
    };
  }
}
