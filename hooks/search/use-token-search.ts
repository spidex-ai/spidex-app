'use client';

import { useState, useEffect } from 'react';

import { CardanoTokenDetail } from '@/services/dexhunter/types';

export const useTokenSearch = (input: string) => {
  const [results, setResults] = useState<CardanoTokenDetail[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchTokens = async () => {
      if (!input) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}/tokens/search?query=${encodeURIComponent(
            input
          )}&verified=true`,
          {
            signal: abortController.signal,
          }
        );
        const data: { data: CardanoTokenDetail[] } = await response.json();
        setResults(data.data);
      } catch (error) {
        // Ignore abort errors
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        console.error('Token search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();

    // Cleanup function to abort previous request when input changes
    return () => {
      abortController.abort();
    };
  }, [input]);

  return { results, loading };
};
