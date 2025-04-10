import { DexHunterClient } from './client';
import {
    BuildSwapResponse,
    EsitmateSwapPayload,
    EsitmateSwapResponse,
    PoolStatsResponse,
    SearchTokenInfo,
    SubmitSwapPayload,
    SubmitSwapResponse,
    SwapPayload,
    TokenDetail
} from './types';

export class DexHunterService {
    private client: DexHunterClient;

    constructor() {
        this.client = new DexHunterClient();
    }
    /**
     * Get market stats
     * @param quote - Quote currency (default: ADA)
     * @returns Promise with market stats
     */
    async searchToken(query: string, verified: boolean = true, page: number = 0, limit: number = 10): Promise<SearchTokenInfo[]> {
        const response = await this.client.get<SearchTokenInfo[]>('swap/tokens', { query, verified, page, limit });
        const paginatedData = response.slice(page * limit, (page + 1) * limit).filter(token => token.is_verified === verified);
        return paginatedData;
    }

    async getTokenDetail(token_id: string): Promise<TokenDetail> {
        const response = await this.client.get<TokenDetail>(`swap/token/${token_id}`);
        return response;
    }

    async poolStats(tokenIn: string, tokenOut: string): Promise<PoolStatsResponse[]> {
        const response = await this.client.get<PoolStatsResponse[]>(`stats/pools/${tokenIn}/${tokenOut}`);
        return response;
    }

    async estimateSwap(payload: EsitmateSwapPayload): Promise<EsitmateSwapResponse> {
        const response = await this.client.post<BuildSwapResponse>('swap/estimate', payload);
        return response;
    }

    async buildSwap(payload: SwapPayload): Promise<BuildSwapResponse> {
        const response = await this.client.post<BuildSwapResponse>('swap/build', payload);
        return response;
    }

    async submitSwap(payload: SubmitSwapPayload): Promise<SubmitSwapResponse> {
        const response = await this.client.post<SubmitSwapResponse>('swap/sign', payload);
        return response;
    }
}


// Export a singleton instance of the service
export const dexHunterService = new DexHunterService();

// Export types and classes
export default dexHunterService;