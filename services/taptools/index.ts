import { TaptoolsClient } from './client';
import {
    TokenPrice,
    TokenPriceChange,
    TokenMcap,
    TokenQuote,
    TokenHolders,
    TokenHolder,
    TokenPool,
    TokenOHLCV,
    TokenTrade,
    TokenTradingStats,
    TokenLinks,
    TopToken,
    TopTokenMcap,
    TopTokenLiquidity,
    NFTCollectionInfo,
    NFTCollectionStats,
    NFTCollectionStatsExtended,
    NFTAssetStats,
    NFTAssetTraits,
    NFTCollectionTradesStats,
    NFTCollectionListings,
    NFTCollectionOHLCV,
    NFTCollectionTrade,
    NFTMarketStats,
    NFTMarketStatsExtended,
    NFTAssetSale,
    NFTCollectionAsset,
    NFTCollectionHoldersDistribution,
    NFTCollectionHolderTop,
    NFTCollectionHolderTrended,
    NFTCollectionListingDepth,
    NFTCollectionListingIndividual,
    NFTCollectionListingTrended,
    NFTCollectionVolumeTrended,
    NFTCollectionRarity,
    NFTCollectionRarityRank,
    NFTCollectionTraitPrice,
    NFTMarketVolumeTrended,
    NFTMarketplaceStats,
    NFTTopTimeframe,
    NFTTopVolume,
    NFTTopVolumeExtended,
    TokenDebtLoan,
    TokenDebtOffer,
    TokenIndicator,
    WalletPortfolioPosition,
    WalletTradeToken,
    WalletValueTrended,
    AddressInfo,
    AddressUtxo
} from './types';

export class TaptoolsService {
    private client: TaptoolsClient;

    constructor(apiKey?: string) {
        this.client = new TaptoolsClient(apiKey);
    }

    // Token Endpoints

    /**
     * Get token prices for specified units
     * @param units - Array of token units (policy + hex name)
     * @returns Promise with token prices
     */
    async getTokenPrices(units: string[]): Promise<TokenPrice> {
        return this.client.post<TokenPrice>('token/prices', units);
    }

    /**
     * Get token price changes for a specific unit
     * @param unit - Token unit (policy + hex name)
     * @returns Promise with token price changes
     */
    async getTokenPriceChanges(unit: string): Promise<TokenPriceChange> {
        return this.client.get<TokenPriceChange>('token/price-changes', { unit });
    }

    /**
     * Get token market cap information
     * @param unit - Token unit (policy + hex name)
     * @returns Promise with token market cap information
     */
    async getTokenMcap(unit: string): Promise<TokenMcap> {
        return this.client.get<TokenMcap>('token/mcap', { unit });
    }

    /**
     * Get token price in a specific quote currency
     * @param unit - Token unit (policy + hex name)
     * @param quote - Quote currency (e.g., USD, EUR)
     * @returns Promise with token quote information
     */
    async getTokenQuote(unit: string, quote: string): Promise<TokenQuote> {
        return this.client.get<TokenQuote>('token/quote', { unit, quote });
    }

    /**
     * Get available quote currencies
     * @returns Promise with available quote currencies
     */
    async getAvailableQuotes(): Promise<string[]> {
        return this.client.get<string[]>('token/quote/available');
    }

    /**
     * Get token holders count
     * @param unit - Token unit (policy + hex name)
     * @returns Promise with token holders count
     */
    async getTokenHolders(unit: string): Promise<TokenHolders> {
        return this.client.get<TokenHolders>('token/holders', { unit });
    }

    /**
     * Get top token holders
     * @param unit - Token unit (policy + hex name)
     * @param page - Page number (default: 1)
     * @param perPage - Items per page (default: 10, max: 100)
     * @returns Promise with top token holders
     */
    async getTopTokenHolders(unit: string, page = 1, perPage = 10): Promise<TokenHolder[]> {
        return this.client.get<TokenHolder[]>('token/holders/top', { unit, page, perPage });
    }

    /**
     * Get token pools
     * @param unit - Token unit (policy + hex name)
     * @returns Promise with token pools
     */
    async getTokenPools(unit: string): Promise<TokenPool[]> {
        return this.client.get<TokenPool[]>('token/pools', { unit });
    }

    /**
     * Get token OHLCV data
     * @param unit - Token unit (policy + hex name)
     * @param interval - Time interval (e.g., 1h, 4h, 1d)
     * @param numIntervals - Number of intervals to return
     * @param quote - Quote currency (default: ADA)
     * @returns Promise with token OHLCV data
     */
    async getTokenOHLCV(unit: string, interval: string, numIntervals?: number, quote = 'ADA'): Promise<TokenOHLCV[]> {
        return this.client.get<TokenOHLCV[]>('token/ohlcv', { unit, interval, numIntervals, quote });
    }

    /**
     * Get token trades
     * @param unit - Token unit (policy + hex name)
     * @param timeframe - Time frame (e.g., 24h, 7d, 30d)
     * @param page - Page number (default: 1)
     * @param perPage - Items per page (default: 100, max: 100)
     * @returns Promise with token trades
     */
    async getTokenTrades(unit: string, timeframe = '24h', page = 1, perPage = 100): Promise<TokenTrade[]> {
        return this.client.get<TokenTrade[]>('token/trades', { unit, timeframe, page, perPage });
    }

    /**
     * Get token trading stats
     * @param unit - Token unit (policy + hex name)
     * @param timeframe - Time frame (e.g., 24h, 7d, 30d)
     * @returns Promise with token trading stats
     */
    async getTokenTradingStats(unit: string, timeframe = '24h'): Promise<TokenTradingStats> {
        return this.client.get<TokenTradingStats>('token/trading/stats', { unit, timeframe });
    }

    /**
     * Get token links
     * @param unit - Token unit (policy + hex name)
     * @returns Promise with token links
     */
    async getTokenLinks(unit: string): Promise<TokenLinks> {
        return this.client.get<TokenLinks>('token/links', { unit });
    }

    /**
     * Get top tokens by volume
     * @param timeframe - Time frame (e.g., 24h, 7d, 30d)
     * @param page - Page number (default: 1)
     * @param perPage - Items per page (default: 10, max: 100)
     * @returns Promise with top tokens by volume
     */
    async getTopTokensByVolume(timeframe = '24h', page = 1, perPage = 10): Promise<TopToken[]> {
        return this.client.get<TopToken[]>('token/top/volume', { timeframe, page, perPage });
    }

    /**
     * Get top tokens by market cap
     * @param page - Page number (default: 1)
     * @param perPage - Items per page (default: 10, max: 100)
     * @returns Promise with top tokens by market cap
     */
    async getTopTokensByMcap(page = 1, perPage = 10): Promise<TopTokenMcap[]> {
        return this.client.get<TopTokenMcap[]>('token/top/mcap', { page, perPage });
    }

    /**
     * Get top tokens by liquidity
     * @param page - Page number (default: 1)
     * @param perPage - Items per page (default: 10, max: 100)
     * @returns Promise with top tokens by liquidity
     */
    async getTopTokensByLiquidity(page = 1, perPage = 10): Promise<TopTokenLiquidity[]> {
        return this.client.get<TopTokenLiquidity[]>('token/top/liquidity', { page, perPage });
    }

    // NFT Endpoints

    /**
     * Get NFT collection information
     * @param policy - Collection policy ID
     * @returns Promise with NFT collection information
     */
    async getNFTCollectionInfo(policy: string): Promise<NFTCollectionInfo> {
        return this.client.get<NFTCollectionInfo>('nft/collection/info', { policy });
    }

    /**
     * Get NFT collection stats
     * @param policy - Collection policy ID
     * @returns Promise with NFT collection stats
     */
    async getNFTCollectionStats(policy: string): Promise<NFTCollectionStats> {
        return this.client.get<NFTCollectionStats>('nft/collection/stats', { policy });
    }

    /**
     * Get NFT collection extended stats
     * @param policy - Collection policy ID
     * @param timeframe - Time frame (e.g., 24h, 7d, 30d)
     * @returns Promise with NFT collection extended stats
     */
    async getNFTCollectionStatsExtended(policy: string, timeframe = '24h'): Promise<NFTCollectionStatsExtended> {
        return this.client.get<NFTCollectionStatsExtended>('nft/collection/stats/extended', { policy, timeframe });
    }

    /**
     * Get NFT asset stats
     * @param policy - Collection policy ID
     * @param name - NFT name
     * @returns Promise with NFT asset stats
     */
    async getNFTAssetStats(policy: string, name: string): Promise<NFTAssetStats> {
        return this.client.get<NFTAssetStats>('nft/asset/stats', { policy, name });
    }

    /**
     * Get NFT asset traits
     * @param policy - Collection policy ID
     * @param name - NFT name
     * @param prices - Include prices (0 or 1, default: 1)
     * @returns Promise with NFT asset traits
     */
    async getNFTAssetTraits(policy: string, name: string, prices = 1): Promise<NFTAssetTraits> {
        return this.client.get<NFTAssetTraits>('nft/asset/traits', { policy, name, prices });
    }

    /**
     * Get NFT collection trades stats
     * @param policy - Collection policy ID
     * @param timeframe - Time frame (e.g., 24h, 7d, 30d)
     * @returns Promise with NFT collection trades stats
     */
    async getNFTCollectionTradesStats(policy: string, timeframe = '24h'): Promise<NFTCollectionTradesStats> {
        return this.client.get<NFTCollectionTradesStats>('nft/collection/trades/stats', { policy, timeframe });
    }

    /**
     * Get NFT collection listings
     * @param policy - Collection policy ID
     * @returns Promise with NFT collection listings
     */
    async getNFTCollectionListings(policy: string): Promise<NFTCollectionListings> {
        return this.client.get<NFTCollectionListings>('nft/collection/listings', { policy });
    }

    /**
     * Get NFT collection OHLCV data
     * @param policy - Collection policy ID
     * @param interval - Time interval (e.g., 1h, 4h, 1d)
     * @param numIntervals - Number of intervals to return
     * @param quote - Quote currency (default: ADA)
     * @returns Promise with NFT collection OHLCV data
     */
    async getNFTCollectionOHLCV(policy: string, interval: string, numIntervals?: number, quote = 'ADA'): Promise<NFTCollectionOHLCV[]> {
        return this.client.get<NFTCollectionOHLCV[]>('nft/collection/ohlcv', { policy, interval, numIntervals, quote });
    }

    /**
     * Get NFT collection trades
     * @param policy - Collection policy ID
     * @param timeframe - Time frame (e.g., 24h, 7d, 30d)
     * @param page - Page number (default: 1)
     * @param perPage - Items per page (default: 100, max: 100)
     * @returns Promise with NFT collection trades
     */
    async getNFTCollectionTrades(policy: string, timeframe = '30d', page = 1, perPage = 100): Promise<NFTCollectionTrade[]> {
        return this.client.get<NFTCollectionTrade[]>('nft/collection/trades', { policy, timeframe, page, perPage });
    }

    /**
     * Get NFT market stats
     * @param timeframe - Time frame (e.g., 24h, 7d, 30d)
     * @returns Promise with NFT market stats
     */
    async getNFTMarketStats(timeframe = '24h'): Promise<NFTMarketStats> {
        return this.client.get<NFTMarketStats>('nft/market/stats', { timeframe });
    }

    /**
     * Get NFT market extended stats
     * @param timeframe - Time frame (e.g., 24h, 7d, 30d)
     * @returns Promise with NFT market extended stats
     */
    async getNFTMarketStatsExtended(timeframe = '24h'): Promise<NFTMarketStatsExtended> {
        return this.client.get<NFTMarketStatsExtended>('nft/market/stats/extended', { timeframe });
    }

    // NFT Endpoints (Additional)

    /**
     * Get NFT asset sales history
     * @param policy - Collection policy ID
     * @param name - NFT name
     * @returns Promise with NFT asset sales history
     */
    async getNFTAssetSales(policy: string, name: string): Promise<NFTAssetSale[]> {
        return this.client.get<NFTAssetSale[]>('nft/asset/sales', { policy, name });
    }

    /**
     * Get NFT collection assets
     * @param policy - Collection policy ID
     * @param sortBy - Sort by (price or rank)
     * @param order - Sort order (asc or desc)
     * @param search - Search by name
     * @param onSale - Filter by on sale status
     * @param page - Page number
     * @param perPage - Items per page
     */
    async getNFTCollectionAssets(
        policy: string,
        sortBy = 'price',
        order = 'asc',
        search?: string,
        onSale = 0,
        page = 1,
        perPage = 100
    ): Promise<NFTCollectionAsset[]> {
        return this.client.get<NFTCollectionAsset[]>('nft/collection/assets', {
            policy,
            sortBy,
            order,
            search,
            onSale,
            page,
            perPage
        });
    }

    /**
     * Get NFT collection holders distribution
     * @param policy - Collection policy ID
     */
    async getNFTCollectionHoldersDistribution(policy: string): Promise<NFTCollectionHoldersDistribution> {
        return this.client.get<NFTCollectionHoldersDistribution>('nft/collection/holders/distribution', { policy });
    }

    /**
     * Get NFT collection top holders
     * @param policy - Collection policy ID
     * @param page - Page number
     * @param perPage - Items per page
     * @param excludeExchanges - Whether to exclude exchange addresses
     */
    async getNFTCollectionTopHolders(
        policy: string,
        page = 1,
        perPage = 10,
        excludeExchanges = 1
    ): Promise<NFTCollectionHolderTop[]> {
        return this.client.get<NFTCollectionHolderTop[]>('nft/collection/holders/top', {
            policy,
            page,
            perPage,
            excludeExchanges
        });
    }

    /**
     * Get NFT collection trended holders
     * @param policy - Collection policy ID
     * @param timeframe - Time frame
     */
    async getNFTCollectionTrendedHolders(
        policy: string,
        timeframe = '30d'
    ): Promise<NFTCollectionHolderTrended[]> {
        return this.client.get<NFTCollectionHolderTrended[]>('nft/collection/holders/trended', {
            policy,
            timeframe
        });
    }

    /**
     * Get NFT collection listings depth
     * @param policy - Collection policy ID
     * @param items - Number of items to return
     */
    async getNFTCollectionListingsDepth(
        policy: string,
        items = 500
    ): Promise<NFTCollectionListingDepth[]> {
        return this.client.get<NFTCollectionListingDepth[]>('nft/collection/listings/depth', {
            policy,
            items
        });
    }

    /**
     * Get NFT collection individual listings
     * @param policy - Collection policy ID
     * @param sortBy - Sort by field
     * @param order - Sort order
     * @param page - Page number
     * @param perPage - Items per page
     */
    async getNFTCollectionIndividualListings(
        policy: string,
        sortBy = 'price',
        order = 'asc',
        page = 1,
        perPage = 100
    ): Promise<NFTCollectionListingIndividual[]> {
        return this.client.get<NFTCollectionListingIndividual[]>('nft/collection/listings/individual', {
            policy,
            sortBy,
            order,
            page,
            perPage
        });
    }

    /**
     * Get NFT collection trended listings
     * @param policy - Collection policy ID
     * @param interval - Time interval
     * @param numIntervals - Number of intervals
     */
    async getNFTCollectionTrendedListings(
        policy: string,
        interval: string,
        numIntervals?: number
    ): Promise<NFTCollectionListingTrended[]> {
        return this.client.get<NFTCollectionListingTrended[]>('nft/collection/listings/trended', {
            policy,
            interval,
            numIntervals
        });
    }

    /**
     * Get NFT collection trended volume
     * @param policy - Collection policy ID
     * @param interval - Time interval
     * @param numIntervals - Number of intervals
     */
    async getNFTCollectionTrendedVolume(
        policy: string,
        interval: string,
        numIntervals?: number
    ): Promise<NFTCollectionVolumeTrended[]> {
        return this.client.get<NFTCollectionVolumeTrended[]>('nft/collection/volume/trended', {
            policy,
            interval,
            numIntervals
        });
    }

    /**
     * Get NFT collection rarity
     * @param policy - Collection policy ID
     */
    async getNFTCollectionRarity(policy: string): Promise<NFTCollectionRarity> {
        return this.client.get<NFTCollectionRarity>('nft/collection/traits/rarity', { policy });
    }

    /**
     * Get NFT rarity rank
     * @param policy - Collection policy ID
     * @param name - NFT name
     */
    async getNFTRarityRank(policy: string, name: string): Promise<NFTCollectionRarityRank> {
        return this.client.get<NFTCollectionRarityRank>('nft/collection/traits/rarity/rank', { policy, name });
    }

    /**
     * Get NFT collection trait prices
     * @param policy - Collection policy ID
     * @param name - NFT name (optional)
     */
    async getNFTCollectionTraitPrices(policy: string, name?: string): Promise<NFTCollectionTraitPrice> {
        return this.client.get<NFTCollectionTraitPrice>('nft/collection/traits/price', { policy, name });
    }

    /**
     * Get NFT market volume trended
     * @param timeframe - Time frame
     */
    async getNFTMarketVolumeTrended(timeframe = '30d'): Promise<NFTMarketVolumeTrended[]> {
        return this.client.get<NFTMarketVolumeTrended[]>('nft/market/volume/trended', { timeframe });
    }

    /**
     * Get NFT marketplace stats
     * @param timeframe - Time frame
     * @param marketplace - Marketplace name
     * @param lastDay - Filter to last day only
     */
    async getNFTMarketplaceStats(
        timeframe = '7d',
        marketplace?: string,
        lastDay = 0
    ): Promise<NFTMarketplaceStats[]> {
        return this.client.get<NFTMarketplaceStats[]>('nft/marketplace/stats', {
            timeframe,
            marketplace,
            lastDay
        });
    }

    /**
     * Get NFT top rankings
     * @param ranking - Ranking criteria
     * @param items - Number of items
     */
    async getNFTTopRankings(ranking: string, items = 25): Promise<NFTTopTimeframe[]> {
        return this.client.get<NFTTopTimeframe[]>('nft/top/timeframe', { ranking, items });
    }

    /**
     * Get NFT top volume collections
     * @param timeframe - Time frame
     * @param page - Page number
     * @param perPage - Items per page
     */
    async getNFTTopVolume(
        timeframe = '24h',
        page = 1,
        perPage = 10
    ): Promise<NFTTopVolume[]> {
        return this.client.get<NFTTopVolume[]>('nft/top/volume', { timeframe, page, perPage });
    }

    /**
     * Get NFT top volume collections (extended)
     * @param timeframe - Time frame
     * @param page - Page number
     * @param perPage - Items per page
     */
    async getNFTTopVolumeExtended(
        timeframe = '24h',
        page = 1,
        perPage = 10
    ): Promise<NFTTopVolumeExtended[]> {
        return this.client.get<NFTTopVolumeExtended[]>('nft/top/volume/extended', {
            timeframe,
            page,
            perPage
        });
    }

    // Token Debt Endpoints

    /**
     * Get active P2P loans
     * @param unit - Token unit
     * @param include - Filter by token usage
     * @param sortBy - Sort by field
     * @param order - Sort order
     * @param page - Page number
     * @param perPage - Items per page
     */
    async getTokenDebtLoans(
        unit: string,
        include = 'collateral,debt',
        sortBy = 'time',
        order = 'desc',
        page = 1,
        perPage = 100
    ): Promise<TokenDebtLoan[]> {
        return this.client.get<TokenDebtLoan[]>('token/debt/loans', {
            unit,
            include,
            sortBy,
            order,
            page,
            perPage
        });
    }

    /**
     * Get active P2P loan offers
     * @param unit - Token unit
     * @param include - Filter by token usage
     * @param sortBy - Sort by field
     * @param order - Sort order
     * @param page - Page number
     * @param perPage - Items per page
     */
    async getTokenDebtOffers(
        unit: string,
        include = 'collateral,debt',
        sortBy = 'time',
        order = 'desc',
        page = 1,
        perPage = 100
    ): Promise<TokenDebtOffer[]> {
        return this.client.get<TokenDebtOffer[]>('token/debt/offers', {
            unit,
            include,
            sortBy,
            order,
            page,
            perPage
        });
    }

    /**
     * Get token price indicators
     * @param unit - Token unit
     * @param interval - Time interval
     * @param items - Number of items
     * @param indicator - Indicator type
     * @param length - Data length
     * @param smoothingFactor - Smoothing factor
     * @param fastLength - Fast length for MACD
     * @param slowLength - Slow length for MACD
     * @param signalLength - Signal length for MACD
     * @param stdMult - Standard deviation multiplier
     * @param quote - Quote currency
     */
    async getTokenIndicators(
        unit: string,
        interval: string,
        items?: number,
        indicator = 'ma',
        length?: number,
        smoothingFactor?: number,
        fastLength?: number,
        slowLength?: number,
        signalLength?: number,
        stdMult?: number,
        quote = 'ADA'
    ): Promise<TokenIndicator[]> {
        return this.client.get<TokenIndicator[]>('token/indicators', {
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
        });
    }

    // Wallet Portfolio Endpoints

    /**
     * Get wallet portfolio positions
     * @param address - Wallet address
     */
    async getWalletPortfolioPositions(address: string): Promise<WalletPortfolioPosition> {
        return this.client.get<WalletPortfolioPosition>('wallet/portfolio/positions', { address });
    }

    /**
     * Get wallet token trade history
     * @param address - Wallet address
     * @param unit - Token unit
     * @param page - Page number
     * @param perPage - Items per page
     */
    async getWalletTokenTrades(
        address: string,
        unit?: string,
        page = 1,
        perPage = 100
    ): Promise<WalletTradeToken[]> {
        return this.client.get<WalletTradeToken[]>('wallet/trades/tokens', {
            address,
            unit,
            page,
            perPage
        });
    }

    /**
     * Get wallet value trended
     * @param address - Wallet address
     * @param timeframe - Time frame
     * @param quote - Quote currency
     */
    async getWalletValueTrended(
        address: string,
        timeframe = '30d',
        quote = 'ADA'
    ): Promise<WalletValueTrended[]> {
        return this.client.get<WalletValueTrended[]>('wallet/value/trended', {
            address,
            timeframe,
            quote
        });
    }

    // Onchain Endpoints

    /**
     * Get asset supply
     * @param unit - Token unit (policy + hex name)
     * @returns Promise with asset supply
     */
    async getAssetSupply(unit: string): Promise<{ supply: number }> {
        return this.client.get<{ supply: number }>('assets/supply', { unit });
    }

    /**
     * Get address information
     * @param address - Cardano address
     * @returns Promise with address information
     */
    async getAddressInfo(address: string): Promise<AddressInfo> {
        return this.client.get<AddressInfo>('address/info', { address });
    }

    /**
     * Get address UTXOs
     * @param address - Cardano address
     * @param page - Page number (default: 1)
     * @param perPage - Items per page (default: 100, max: 100)
     * @returns Promise with address UTXOs
     */
    async getAddressUTXOs(address: string, page = 1, perPage = 100): Promise<AddressUtxo[]> {
        return this.client.get<AddressUtxo[]>('address/utxos', { address, page, perPage });
    }

    // Market Endpoints

    /**
     * Get market stats
     * @param quote - Quote currency (default: ADA)
     * @returns Promise with market stats
     */
    async getMarketStats(quote = 'ADA'): Promise<{ activeAddresses: number; dexVolume: number }> {
        return this.client.get<{ activeAddresses: number; dexVolume: number }>('market/stats', { quote });
    }
}

// Export a singleton instance of the service
export const taptoolsService = new TaptoolsService();

// Export types and classes
export default taptoolsService; 