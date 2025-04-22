'use client'

import { CardanoTokenDetail } from "@/services/dexhunter/types";
import { useEffect, useState } from "react";
import { useSpidexCoreContext } from "@/app/_contexts/spidex-core";
export const useTokenDetail = (address: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CardanoTokenDetail | null>(null);
  const { getTokenDetailCore } = useSpidexCoreContext();

  useEffect(() => {
    if (address) {
      getTokenDetail(address);
    }
  }, [address]);

  const getTokenDetail = async (address: string) => {
    setIsLoading(true);
    try {
      const response = await getTokenDetailCore(address);
      setData(response);
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
