import useSWR from 'swr';

import type { SavedToken } from '@/db/types';
import { useSpidexCore } from '@/hooks/core/useSpidexCore';

export const useSavedTokens = () => {
  const { auth } = useSpidexCore();

  const { data, isLoading, error, mutate } = useSWR<SavedToken[]>(
    '/api/saved-tokens',
    async (route: string) => {
      const accessToken = auth?.accessToken;
      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      return fetch(route, {
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(res => res.json());
    }
  );

  return {
    savedTokens: data ?? [],
    isLoading,
    error,
    mutate,
  };
};
