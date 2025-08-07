'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { usePortfolioToken } from '@/hooks/portfolio';

export const useCardanoTokenBalance = (
  tokenUnit: string,
  walletAddress: string
) => {
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchBalance();
  }, [tokenUnit, walletAddress]);

  const fetchBalance = async () => {
    setIsLoading(true);
    // TODO: Fetch balance from API
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setBalance(0);
  };

  return {
    balance,
    isLoading,
  };
};




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

  let adaBalance = portfolio?.amount.find(
    token => token.unit === 'lovelace'
  )?.quantity;

  return {
    balance: tokenBalance || 0,
    isLoading: loading,
    adaBalance: adaBalance || 0,
  };
};
