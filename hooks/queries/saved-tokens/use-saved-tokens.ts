import useSWR from 'swr';

import { useSpidexCoreContext } from '@/app/_contexts';
import type { SavedToken } from '@/db/types';

export const useSavedTokens = () => {
  const { auth } = useSpidexCoreContext();

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
