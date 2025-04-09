"use client";

import { useState, useEffect } from "react";

import { CardanoTokenDetail } from "@/services/dexhunter/types";

export const useTokenSearch = (input: string) => {
    const [results, setResults] = useState<CardanoTokenDetail[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTokens = async () => {
            if (!input) {
                setResults([]);
                return;
            }
            
            setLoading(true);
            try {
                const response = await fetch(
                    `/api/tokens/search?query=${encodeURIComponent(
                      input
                    )}&verified=true`
                );
                const data: CardanoTokenDetail[] = await response.json();
                
                setResults(data);
            } catch (error) {
                console.error('Token search error:', error);
                setResults([]);
            }
            setLoading(false);
        };

        fetchTokens();
    }, [input]);

    return { results, loading };
};