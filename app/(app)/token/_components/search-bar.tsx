'use client';

import React, { useState, useEffect, useRef } from 'react';

import Link from 'next/link';

import { Search } from 'lucide-react';

import { Button, Input, Skeleton } from '@/components/ui';

import SaveToken from '../../_components/save-token';

import { useDebounce } from '@/hooks';

// import type { TokenSearchResult } from '@/services/birdeye/types';
import { SearchTokenInfo } from '@/services/dexhunter/types';
import { getLogoUrl } from '@/app/utils/logo';
import { formatNumber } from '@/lib/utils';

interface Props {
  isTitle?: boolean;
}

const SearchBar: React.FC<Props> = ({ isTitle = true }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<SearchTokenInfo[]>([]);
  console.log("🚀 ~ results:", results)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedValue = useDebounce(inputValue, 500);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL
        }/tokens/search?query=${encodeURIComponent(searchQuery)}&verified=true&limit=30&page=1`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      console.log("🚀 ~ handleSearch ~ data.data:", data.data)

      setResults(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="flex flex-col gap-2">
      {isTitle && <h2 className="text-lg font-bold">Search</h2>}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none" />
        <Input
          placeholder="Search by ticket, token, pair"
          value={inputValue}
          onChange={e => {
            const value = e.target.value;
            const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '');
            const truncatedValue = sanitizedValue.slice(0, 25);
            setInputValue(truncatedValue);
          }}
          className="pl-9 w-full cursor-text rounded-full placeholder:text-sm placeholder:text-text-gray placeholder:opacity-50"
          ref={inputRef}
          maxLength={25}
          onFocus={() => setIsFocused(true)}
          onBlur={e => {
            if (!e.relatedTarget?.closest('.search-results')) {
              setIsFocused(false);
            }
          }}
          autoFocus
        />
        {isFocused && (
          <div
            className="search-results absolute top-full left-0 right-0 mt-2 bg-popover border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 rounded-md shadow-md z-50"
            onMouseDown={e => e.preventDefault()}
          >
            {loading ? (
              <Skeleton className="h-48 w-full" />
            ) : (
              <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
                {inputValue ? (
                  results.length === 0 || error ? (
                    <p className="text-xs text-muted-foreground p-2">
                      No results for &quot;{inputValue}&quot;
                    </p>
                  ) : (
                    results.map((token: SearchTokenInfo) => (
                      <Link
                        href={`/token/${token.token_id}`}
                        key={token.token_id}
                        onMouseDown={e => e.preventDefault()}
                        className="h-fit"
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-4 px-2 py-1 h-fit"
                        >
                          
                            <img
                              src={getLogoUrl(token.logo || '')}
                              alt={token.token_ascii}
                              className="rounded-full size-8"
                            />
                          
                          <div className="flex flex-col items-start">
                            <span className="font-bold text-sm">
                              {token.token_ascii} {token.ticker ? `(${token.ticker})` : null}
                            </span>
                        
                            <p className="text-xs text-muted-foreground">
                              ${formatNumber(token.usdPrice || 0, 4)}
                            </p>
                          </div>
                          <SaveToken address={token.token_id} />
                        </Button>
                      </Link>
                    ))
                  )
                ) : (
                  <p className="text-xs text-muted-foreground p-2">
                    Start typing to search for tokens
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
