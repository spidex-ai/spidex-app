import { TokenCardanoClient } from './client';
import {
    BatchTokenCardanoInfo
} from './types';

export class TokenCardanoService {
    private client: TokenCardanoClient;

    constructor() {
        this.client = new TokenCardanoClient();
    }
    /**
     * Batch token info
     * @param tokens - Array of token IDs
     * @param properties - Array of properties to fetch
     * @returns Promise with token info
     */
    async batchTokenInfo(tokens: string[], properties: string[]): Promise<BatchTokenCardanoInfo> {
        return this.client.post<BatchTokenCardanoInfo>('metadata/query', {
            subjects: tokens,
            properties: properties
        });
    }
}

// Export a singleton instance of the service
export const tokenCardanoService = new TokenCardanoService();

// Export types and classes
export default tokenCardanoService; 