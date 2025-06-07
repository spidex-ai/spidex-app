'use client';

import { getLogoUrl } from '@/app/utils/logo';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks';
import { SearchTokenInfo } from '@/services/dexhunter/types';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export function TokenSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchTokenInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query, 300);

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
        }/tokens/search?query=${encodeURIComponent(searchQuery)}&verified=true`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Effect to trigger search when debounced query changes
  useEffect(() => {
    handleSearch(debouncedQuery);
  }, [debouncedQuery]);

  const formatPrice = (price: number) => {
    if (price === 0) return '$0.00';
    if (price < 0.0001) return `$${price.toExponential(4)}`;
    if (price < 1) return `$${price.toFixed(6)}`;
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for tokens..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      {loading && (
        <div className="mt-4 text-center text-muted-foreground">
          Searching...
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-destructive">{error}</div>
      )}

      {results.length > 0 && (
        <Card className="mt-4">
          <div className="divide-y">
            {results.map(token => (
              <div
                key={`${token.token_id}`}
                className="p-4 hover:bg-muted/50 cursor-pointer"
                onClick={() => {
                  // Handle token selection
                  console.log('Selected token:', token);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {token.logo && (
                      <img
                        src={getLogoUrl(token.logo)}
                        alt={token.token_ascii}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-medium">{token.token_ascii}</div>
                      <div className="text-sm text-muted-foreground">
                        {token.ticker}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {token.price && (
                      <div className="text-sm font-medium">
                        {formatPrice(token.price)}
                      </div>
                    )}
                    {token.is_verified && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
