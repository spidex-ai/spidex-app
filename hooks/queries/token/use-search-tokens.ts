"use client"

import { useState } from "react";

import useSWR from "swr";

import type { SearchResultItem } from "@/services/birdeye/types";

export const useSearchTokens = () => {

    const [search, setSearch] = useState("");

    const { data, isLoading, error } = useSWR<SearchResultItem[]>(`/api/token/search?search=${search}`, async () => {
        if (!search) return [];
        
        const response = await fetch(
            `/api/tokens/search?query=${encodeURIComponent(
                search
            )}&verified=true`
          );
          const res = await response.json();
          console.log('res', res);
          

        return response.json();
    });

    return {
        data: data ?? [],
        isLoading,
        error,
        search,
        setSearch,
    };
}