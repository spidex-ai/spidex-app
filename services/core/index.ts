import { orderBy } from 'lodash';
import { CoreClient } from './client';
import { ApiResponse, WalletBalances, WalletTransaction } from './types';

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
}

export const coreService = new CoreService();

// Export types and classes
export default coreService;
