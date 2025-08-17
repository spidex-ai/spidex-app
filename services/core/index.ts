import { CoreClient } from './client';
import { ApiResponse, WalletBalances, WalletTransaction } from './types';
import { Token } from '@/db/types';
import { TokenHolder, TokenStats, TopTokenMcap } from '../taptools/types';
import { CardanoTokenDetail } from '../dexhunter/types';

export class CoreService {
  private client: CoreClient;

  constructor() {
    this.client = new CoreClient();
  }

  async getBalances(walletAddress: string): Promise<WalletBalances> {
    const response = await this.client.get<ApiResponse<WalletBalances>>(
      `portfolio/${walletAddress}`
    );
    console.log('🚀 ~ CoreService ~ getBalances ~ response:', response);
    return response.data;
  }

  async getTransactionHistory(
    walletAddress: string
  ): Promise<WalletTransaction[]> {
    const response = await this.client.get<ApiResponse<WalletTransaction[]>>(
      `portfolio/${walletAddress}/transactions`,
      {
        orderBy: 'desc',
        page: 1,
        count: 50,
      }
    );
    return response.data;
  }

  async getTopTokensByMcap(page: number, limit: number) {
    try {
      const response = await this.client.get<ApiResponse<TopTokenMcap[]>>(
        `tokens/top/mcap?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTopTokensByVolume(page: number, limit: number, timeframe = '24h') {
    try {
      const response = await this.client.get<ApiResponse<Token[]>>(
        `tokens/top/volume?page=${page}&limit=${limit}&timeframe=${timeframe}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTopTokenTraders(tokenId: string, page: number, limit: number) {
    try {
      const response = await this.client.get<ApiResponse<TokenHolder[]>>(
        `tokens/${tokenId}/top-traders?page=${page}&limit=${limit}&timeFrame=1h`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTokenStats(tokenId: string) {
    try {
      const response = await this.client.get<ApiResponse<TokenStats>>(
        `tokens/${tokenId}/stats`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async searchToken(query: string, limit = 30, page = 1, verified = true) {
    try {
      const response = await this.client.get<ApiResponse<CardanoTokenDetail[]>>(
        `tokens/search?query=${query}&limit=${limit}&page=${page}&verified=${verified}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTokenDetail(tokenId: string) {
    console.log("🚀 ~ CoreService ~ getTokenDetail ~ tokenId:", tokenId)
    try {
      const response = await this.client.get<ApiResponse<CardanoTokenDetail>>(
        `tokens/${tokenId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTokenTopHolders(tokenId: string, limit = 20, page = 1) {
    try {
      const response = await this.client.get<ApiResponse<TokenHolder[]>>(
        `tokens/${tokenId}/top-holders?limit=${limit}&page=${page}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTokenTopTraders(tokenId: string, limit = 20, page = 1) {
    try {
      const response = await this.client.get<ApiResponse<TokenHolder[]>>(
        `tokens/${tokenId}/top-traders?limit=${limit}&page=${page}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const coreService = new CoreService();

// Export types and classes
export default coreService;
