import { useSpidexCore } from '@/hooks/core/useSpidexCore';
import useSWR from 'swr';

export const useIsTokenSaved = (address: string) => {
  const { auth } = useSpidexCore();

  const { data, isLoading, error, mutate } = useSWR<boolean>(
    `/api/saved-tokens/${address}`,
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
      })
        .then(res => res.json())
        .then(data => data !== null)
        .catch(() => false);
    }
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
