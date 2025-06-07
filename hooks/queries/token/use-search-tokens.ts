'use client';

import { useState } from 'react';

import useSWR from 'swr';

import type { SearchResultItem } from '@/services/birdeye/types';

export const useSearchTokens = () => {
  const [search, setSearch] = useState('');

  const { data, isLoading, error } = useSWR<SearchResultItem[]>(
    `/api/token/search?search=${search}`,
    async () => {
      if (!search) return [];

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}/tokens/search?query=${encodeURIComponent(
          search
        )}&verified=true`
      );
      const res = await response.json();

      return response.json();
    }
  );

  return {
    data: data ?? [],
    isLoading,
    error,
    search,
    setSearch,
  };
};
