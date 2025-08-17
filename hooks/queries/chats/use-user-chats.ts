import type { Chat } from '@/db/types';
import { useSpidexCore } from '@/hooks/core/useSpidexCore';
import useSWR from 'swr';
export const useUserChats = () => {
  const { auth } = useSpidexCore();

  const { data, isLoading, error, mutate } = useSWR<Chat[]>(
    '/api/chats',
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
    chats: data ?? [],
    isLoading,
    error,
    mutate,
  };
};
