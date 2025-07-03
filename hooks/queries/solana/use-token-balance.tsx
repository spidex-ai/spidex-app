'use client';

import { usePortfolioToken } from '@/hooks/portfolio';

export const useTokenBalance = (tokenUnit: string) => {
  const { data: portfolio, loading } = usePortfolioToken();

  let tokenBalance = portfolio?.amount.find(
    token => token.unit === tokenUnit
  )?.quantity;

  if (tokenUnit === 'ADA' || tokenUnit === 'lovelace') {
    tokenBalance = portfolio?.amount.find(
      token => token.unit === 'lovelace'
    )?.quantity;
  }

  return {
    balance: tokenBalance || 0,
    isLoading: loading,
  };
};
