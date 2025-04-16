'use client'

import { CardanoTokenDetail } from "@/services/dexhunter/types";
import { useEffect, useState } from "react";

export const useTokenDetail = (address: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CardanoTokenDetail | null>(null);

  useEffect(() => {
    if (address) {
      getTokenDetail(address);
    }
  }, [address]);

  const getTokenDetail = async (address: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/token/${address}/detail`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getTokenDetail,
    data
  };
};
