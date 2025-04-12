import { useCallback, useState } from 'react';
export const useSpidexCore = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const getTopTokensByVolume = useCallback(async (timeframe = '24h', page = 1, perPage = 10) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}/tokens/top/volume?timeframe=${timeframe}&page=${page}&perPage=${perPage}`);

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            setLoading(false);
            return data.data;
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            setLoading(false);
            console.error('Taptools API error:', err);
            return null;
        }
    }, []);


    const getTopTokensByMcap = useCallback(async (page = 1, perPage = 10) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}/tokens/top/mcap?page=${page}&perPage=${perPage}`);

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            setLoading(false);
            return data.data;
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            setLoading(false);
            console.error('Taptools API error:', err);
            return null;
        }
    }, []);

    return {
        loading,
        error,
        getTopTokensByVolume,
        getTopTokensByMcap
    };
};
