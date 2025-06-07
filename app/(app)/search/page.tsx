import { TokenSearch } from '@/app/components/token-search';

export default function SearchPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Token Search</h1>
          <p className="text-muted-foreground">
            Search for tokens by name, symbol, or address
          </p>
        </div>
        <TokenSearch />
      </div>
    </div>
  );
}
