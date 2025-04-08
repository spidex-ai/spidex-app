'use client'

import { useTaptools } from "@/hooks/useTaptools";
import { TrendingToken } from "@/services/birdeye/types";
import { TopToken } from "@/services/taptools/types";
import { useEffect, useState } from "react";

export const useTokenTrending = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<TopToken[]>([]);
    const { getTopTokensByVolume } = useTaptools();

    useEffect(() => {
        fetchTopTokenTreding();
    }, []);
  
    const fetchTopTokenTreding = async () => {
      setIsLoading(true);
      try {
        const data = await getTopTokensByVolume();
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
      data
    };
  };
  

export const useTokenTopMcap = (page: number, perPage: number) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<TopToken[]>([]);

    useEffect(() => {
        fetchTopTokenMcap();
    }, []);

    const fetchTopTokenMcap = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/taptools/token/top/mcap?page=${page}&perPage=${perPage}`);

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }
    
          const data = await response.json();
          console.log('data::: top mcap', data);
          setData(data);
        } catch (error) {
          setError(error as string);
        } finally {
          setIsLoading(false);
        }
    }

    return {
      isLoading,
      error,
      data
    }
}

