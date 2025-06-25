'use client';

import { usePortfolioToken } from '@/hooks/portfolio';

export const useTokenBalance = (tokenUnit: string) => {
  const { data: portfolio, loading } = usePortfolioToken();

  const tokenBalance = portfolio?.amount.find(
    token => token.unit === tokenUnit
  )?.quantity;

  return {
    balance: tokenBalance || 0,
    isLoading: loading,
  };
};
