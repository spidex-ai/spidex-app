
"use client"

import useSWR from 'swr';
import { CandleStickInterval } from './../../../services/hellomoon/types/candlestick';
import { TokenPriceCandlestick, CandlestickGranularity } from '@/services/hellomoon/types';
import { useTaptools } from '@/hooks/useTaptools';
import { useEffect, useState } from 'react';

export const usePriceChart = (mint: string, timeframe: CandlestickGranularity, numDays: number) => {

    const { data, isLoading, error, mutate } = useSWR<TokenPriceCandlestick[]>(
        `/api/token/${mint}/prices/${timeframe}/${numDays}`,
        async () => fetch(`/api/token/${mint}/prices`, {
            method: 'POST',
            body: JSON.stringify({
                timeframe,
                numDays
            })
        }).then(res => res.json()),
        {
            refreshInterval: 5000
        }
    );

    return { 
        data: data || [], 
        isLoading, 
        error, 
        mutate 
    };
} 

export const usePriceChartTaptools = (unit: string, interval: CandleStickInterval, numIntervals: number) => {
    const { getTokenOHLCV } = useTaptools(); 

    const [data, setData] = useState<TokenPriceCandlestick[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDataChart();
    }, [unit, interval, numIntervals]);

    const fetchDataChart = async () => {
        try {
            setIsLoading(true);
            const data = await getTokenOHLCV(unit, interval, numIntervals);
            setData(data);
        } catch (error) {
            setData([]);
            console.error(error);
            setError(error as string);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        data,
        isLoading,
        error,
        fetchDataChart
    }
}