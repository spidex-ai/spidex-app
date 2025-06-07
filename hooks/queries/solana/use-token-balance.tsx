'use client';

import { usePortfolioToken } from '@/hooks/portfolio';

export const useTokenBalance = (address: string, tokenUnit: string) => {
  const { data: portfolio, loading } = usePortfolioToken(address);

  const tokenBalance = portfolio?.amount.find(
    token => token.unit === tokenUnit
  )?.quantity;

  return {
    balance: tokenBalance || 0,
    isLoading: loading,
  };
};
