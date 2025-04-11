"use client"

import useSWR from "swr";

import type { MarketsResponseData } from "@/services/birdeye/types";
import { useEffect, useState } from "react";

import type { TokenStats } from "@/services/taptools/types";

export const useTokenMarkets = (address: string) => {
    const { data, isLoading, error } = useSWR<MarketsResponseData>(
        `/api/token/${address}/markets`, 
        (url: string) => fetch(url).then(res => res.json()),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return { 
        data: data || null, 
        isLoading,
        error 
    };
}

export const useTokenStats = (tokenId: string | undefined) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<TokenStats | null>(null);

    useEffect(() => {
        if (tokenId) {
            fetchTokenStats()
        }
    }, [tokenId]);

    const fetchTokenStats = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/token/${tokenId}/stats`);
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        data,
        isLoading,
        error
    }
}