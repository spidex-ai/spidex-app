'use client';

import {
  BuildSwapResponse,
  SubmitSwapPayload,
  SubmitSwapResponse,
  SwapPayload,
} from '@/services/dexhunter/types';

export interface WalletAPI {
  getUsedAddresses(): Promise<string[]>;
  signTx(cbor: string, partialSign: boolean): Promise<string>;
  submitTx(signedTx: string): Promise<string>;
}

export interface SwapBuildResponse {
  cbor: string;
  tx_hash: string;
}

export const useSwapCardano = () => {
  const buildSwapRequest = async (payload: SwapPayload) => {
    try {
      const response = await fetch('/api/swap/build', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error building swap request:', error);
      throw error;
    }
  };

  const signSwapRequest = async (
    api: WalletAPI,
    swap: BuildSwapResponse
  ): Promise<string> => {
    try {
      const signatures = await api?.signTx(swap?.cbor, true);
      return signatures;
    } catch (err) {
      console.error('Error signing transaction:', err);
      throw new Error('Error signing transaction');
    }
  };

  const submitSwapRequest = async (
    payload: SubmitSwapPayload
  ): Promise<SubmitSwapResponse> => {
    try {
      const response = await fetch('/api/swap/submit', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error submitting transaction:', err);
      throw new Error('Error submitting transaction');
    }
  };

  return {
    buildSwapRequest,
    signSwapRequest,
    submitSwapRequest,
  };
};
