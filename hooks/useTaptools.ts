import { TokenPrice } from '@/services/taptools/types';
import { useState, useCallback } from 'react';

/**
 * Custom hook for interacting with the Taptools API through our server-side API routes
 */
export const useTaptools = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Get token prices for specified units
   * @param units - Array of token units (policy + hex name)
   */
  const getTokenPrices = useCallback(async (units: string[]): Promise<TokenPrice | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/taptools/token/prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ units }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
      console.error('Taptools API error:', err);
      return null;
    }
  }, []);

  /**
   * Get top tokens by volume
   * @param timeframe - Time frame (e.g., 24h, 7d, 30d)
   * @param page - Page number
   * @param perPage - Items per page
   */
  const getTopTokensByVolume = useCallback(async (timeframe = '24h', page = 1, perPage = 10) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/taptools/token/top/volume?timeframe=${timeframe}&page=${page}&perPage=${perPage}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
      console.error('Taptools API error:', err);
      return null;
    }
  }, []);

  /**
   * Get NFT collection stats
   * @param policy - Collection policy ID
   */
  const getNFTCollectionStats = useCallback(async (policy: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/taptools/nft/collection/stats?policy=${policy}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
      console.error('Taptools API error:', err);
      return null;
    }
  }, []);

  /**
   * Get token OHLCV data
   * @param unit - Token unit (policy + hex name)
   * @param interval - Time interval (e.g., 1h, 4h, 1d)
   * @param numIntervals - Number of intervals to return
   * @param quote - Quote currency
   */
  const getTokenOHLCV = useCallback(async (unit: string, interval: string, numIntervals?: number, quote = 'ADA') => {
    setLoading(true);
    setError(null);

    try {
      let url = `/api/taptools/token/ohlcv?unit=${unit}&interval=${interval}`;

      if (numIntervals !== undefined) {
        url += `&numIntervals=${numIntervals}`;
      }

      if (quote) {
        url += `&quote=${quote}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
      console.error('Taptools API error:', err);
      return null;
    }
  }, []);

  /**
   * Get market stats
   * @param quote - Quote currency
   */
  const getMarketStats = useCallback(async (quote = 'ADA') => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/taptools/market/stats?quote=${quote}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
      console.error('Taptools API error:', err);
      return null;
    }
  }, []);

  return {
    loading,
    error,
    getTokenPrices,
    getTopTokensByVolume,
    getNFTCollectionStats,
    getTokenOHLCV,
    getMarketStats,
  };
};
